"use client";
import { Button } from "@/components/react-aria/Button";
import { TextField, TextFieldArea } from "@/components/react-aria/TextField";
import { Address, BasicDetails, Phone } from "@/types/kysely";
import { Pencil, SaveIcon, Trash2, Upload } from "lucide-react";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FileWithPreview, ImageUpload } from "@/components/react-aria/DropZone";
import { Form } from "@/components/react-aria/Form";
import {
  addAddressAction,
  basicDetailUpdateAction,
  FormState,
} from "./actions";
import { Tab, TabList, TabPanel, Tabs } from "@/components/react-aria/Tabs";
import Image from "next/image";
import path from "path";
import { fileToFileWithPreview, getFilePath } from "@/lib/utils";
import {
  Disclosure,
  DisclosureGroup,
  DisclosureHeader,
  DisclosurePanel,
} from "@/components/react-aria/Disclosure";
import {
  Cell,
  Column,
  Row,
  Table,
  TableHeader,
} from "@/components/react-aria/Table";
import {
  DialogTrigger,
  FileTrigger,
  TableBody,
  TooltipTrigger,
} from "react-aria-components";
import { Tooltip } from "@/components/react-aria/Tooltip";
import { Input, Label } from "@/components/react-aria/Field";
import { Dialog } from "@/components/react-aria/Dialog";
import { Modal } from "@/components/react-aria/Modal";
import { CropperComponent } from "@/components/react-aria/Cropper";
import { sendNotification, toastQueue } from "@/components/Toasts/toast";
import { useRouter } from "next/navigation";

export function BasicDetailComponent({ details }: { details: BasicDetails }) {
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      <div className="rounded-md border-2 p-2 drop-shadow-2">
        {editMode ? (
          <EditBasicDetailView details={details} setEditMode={setEditMode} />
        ) : (
          <BasicDetailsView details={details} />
        )}
        <br />
        <div className="flex justify-end">
          <Button
            variant={editMode ? "destructive" : "secondary"}
            className={"font-medium"}
            onPress={() => setEditMode(!editMode)}
          >
            {editMode ? "Cancel" : "Edit"}
          </Button>
        </div>
      </div>
    </>
  );
}

export function TabView({
  details,
  addresses,
  phones,
}: {
  details: BasicDetails;
  addresses: Address[];
  phones: Phone[];
}) {
  return (
    <Tabs>
      <TabList>
        <Tab id="basicdetails">Basic Details</Tab>
        <Tab id="contact">Contact Information</Tab>
      </TabList>
      <TabPanel id="basicdetails">
        <BasicDetailComponent details={details} />
      </TabPanel>
      <TabPanel id="contact">
        <ContactListView addresses={addresses} phones={phones}/>
      </TabPanel>
    </Tabs>
  );
}

export function BasicDetailsView({ details }: { details: BasicDetails }) {
  const logo_url = getFilePath({
    module: "basicdetails",
    fileName: details.logo_url!,
  });
  return (
    <>
      <div className=" font-medium text-body dark:text-bodydark">
        {" "}
        Company Name
      </div>
      <div className=" font-semibold">{details.company_name}</div>
      <br />
      <div className=" font-medium text-body dark:text-bodydark"> About Us</div>
      <div className="max-h-40 overflow-scroll font-medium">
        {" "}
        {details.about_us}
      </div>
      <br />
      <span className="font-medium text-body dark:text-bodydark">Logo</span>
      <Image
        src={logo_url}
        width={100}
        height={100}
        alt={"logo url"}
        unoptimized
      />
    </>
  );
}

function EditBasicDetailView({
  details,
  setEditMode,
}: {
  details: BasicDetails;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}) {
  const [formState, formAction, isPending] = useActionState(
    basicDetailUpdateAction,
    null,
  );
  const [file, setFile] = useState<FileWithPreview | null>(null);
  async function onSubmit(formData: FormData) {
    if (file !== null) {
      formData.append("file2", file as Blob);
      // send old file name to delete that
      formData.append("old_file_name", details.logo_url!);
    }
    let res = formAction(formData);
    console.log(res);
  }
  useEffect(() => {
    if (formState?.success) {
      setEditMode(false);
    }
  }, [formState]);

  return (
    <>
      <Form action={onSubmit}>
        <TextField
          className={"w-fit"}
          defaultValue={details.company_name}
          label="Company Name"
          minLength={3}
          maxLength={95}
          name="company_name"
        />

        <TextFieldArea
          rows={5}
          cols={50}
          className={" bg: border-stroke dark:border-strokedark"}
          name="about_us"
          label="About Us"
          defaultValue={details.about_us}
          maxLength={950}
        />
        <div>
          <Label>Logo</Label>
          <ImageChangeWithCrop
            file={file}
            setFile={setFile}
            url={getFilePath({
              module: "basicdetails",
              fileName: details.logo_url!,
            })}
          />
        </div>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}

function ImageChangeWithCrop({
  url,
  file,
  setFile,
}: {
  url: string;
  file: FileWithPreview | null;
  setFile: Dispatch<SetStateAction<FileWithPreview | null>>;
}) {
  // show a preview of image and an file input
  // if a new file is added to input use that image for preview
  // if the file is removed, show the preview from url.
  // const [file, setFile] = useState<FileWithPreview | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => URL.revokeObjectURL(file?.preview!);
  }, [file]);
  return (
    <>
      <div className="relative flex items-center gap-2">
        {file === null ? (
          <Image
            src={url}
            width={100}
            height={100}
            alt="Image unavailable"
            unoptimized
          />
        ) : (
          <div className="flex flex-col justify-center">
            <Image
              src={file.preview!}
              width={100}
              height={100}
              alt="Unable to show preview"
              unoptimized
            />
            <Button
              variant="destructive"
              className={" text-xs font-bold"}
              onPress={() => setFile(null)}
            >
              Remove
            </Button>
          </div>
        )}

        <FileTrigger
          acceptedFileTypes={["image/*"]}
          onSelect={(e) => {
            if (e) {
              console.log(e.item(0)!.size);
              if (e.item(0)!.size >= 5242880) {
                sendNotification({
                  message: "File size should be less than 5MB!",
                });
              } else {
                setFile(fileToFileWithPreview(e.item(0)!));
                // close the crop model
                setIsOpen(!isOpen);
              }
            }
          }}
        >
          <TooltipTrigger delay={0}>
            <Button variant="secondary" className={"h-10"}>
              <Upload />
            </Button>
            <Tooltip>Click here to upload new logo</Tooltip>
          </TooltipTrigger>
        </FileTrigger>
        {file && (
          <DialogTrigger isOpen={isOpen}>
            <Modal className={"w-fit"}>
              <Dialog>
                <CropperComponent
                  file={file!}
                  setFile={setFile}
                  aspectRatio={1 / 1}
                  isModalOpen={setIsOpen}
                />
              </Dialog>
            </Modal>
          </DialogTrigger>
        )}
      </div>
    </>
  );
}

function ContactListView({ addresses,phones }: { addresses: Address[],phones:Phone[] }) {
  //
  return (
    <>
      <DisclosureGroup>
        <Disclosure>
          <DisclosureHeader>Addresses</DisclosureHeader>
          <DisclosurePanel>
            <AddressTableWrapper addresses={addresses} />
          </DisclosurePanel>
        </Disclosure>
        <Disclosure>
          <DisclosureHeader>Phone Numbers</DisclosureHeader>
          <DisclosurePanel>Phone content</DisclosurePanel>
        </Disclosure>
        <Disclosure>
          <DisclosureHeader>Emails</DisclosureHeader>
          <DisclosurePanel>Email content</DisclosurePanel>
        </Disclosure>
        <Disclosure>
          <DisclosureHeader>Social Medias</DisclosureHeader>
          <DisclosurePanel>Social Media content</DisclosurePanel>
        </Disclosure>
      </DisclosureGroup>
    </>
  );
}

function TableWrapperLayout({
  children,
  NewForm,
}: {
  children: React.ReactNode;
  NewForm: React.ComponentType;
}) {
  // accepts the table as the children and a form component for add button
  return (
    <>
      {children}
      <NewForm />
    </>
  );
}

export const AddressTable = ({ addresses }: { addresses: Address[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen,setIsDeleteOpen] = useState(false);
  const [address, selectedAddress] = useState<Address | undefined>(undefined);
  console.log(isOpen);
  return (
    <>
      <Table aria-label="Addresses">
        <TableHeader>
          <Column id="line_1" isRowHeader allowsSorting>
            Line 1
          </Column>
          <Column id="line_2" allowsSorting>
            Line 2
          </Column>
          <Column id="line_3" allowsSorting>
            Line 3
          </Column>
          <Column id="actions" allowsSorting>
            Actions
          </Column>
        </TableHeader>
        <TableBody items={addresses}>
          {(row) => (
            <Row>
              <Cell>{row.line_1}</Cell>
              <Cell>{row.line_2}</Cell>
              <Cell>{row.line_3}</Cell>
              <Cell>
                <div className="flex gap-2">
                  <Button
                    variant="icon"
                    onPress={() => {
                      selectedAddress(row);
                      setIsOpen(true);
                    }}
                  >
                    <Pencil color="green" size={20}/>
                  </Button>

                  <Button variant="icon">
                    <Trash2 color="red" size={20} />
                  </Button>
                </div>
              </Cell>
            </Row>
          )}
        </TableBody>
      </Table>
      {/* This will open the form for editing address */}
      <DialogTrigger isOpen={isOpen}>
        <Modal>
          <Dialog>
            <AddressForm defaultData={address} setIsModalOpen={setIsOpen} />
          </Dialog>
        </Modal>
      </DialogTrigger>
      <DialogTrigger isOpen={isDeleteOpen}>
        <Modal>
          <Dialog>
            <Form>
              <span>Do you want to delete this address?</span>
              <span>{address?.line_1}</span>
              <span>{address?.line_2}</span>
              <span>{address?.line_3}</span>

            </Form>
          </Dialog>
        </Modal>
      </DialogTrigger>
    </>
  );
};

function AddNewThing({
  NewForm,
}: {
  NewForm: React.ComponentType<{
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    defaultData?: Address;
  }>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DialogTrigger isOpen={isOpen}>
        <Button className={"m-2"} onPress={() => setIsOpen(true)}>
          Add New
        </Button>
        <Modal>
          <Dialog>
            <NewForm setIsModalOpen={setIsOpen} />
          </Dialog>
        </Modal>
      </DialogTrigger>
    </>
  );
}

function AddressFields({ data }: { data?: Address }) {
  return (
    <>
      <TextField
        label="Line 1"
        name="line_1"
        isRequired
        minLength={3}
        maxLength={200}
        defaultValue={data?.line_1 || ""}
      />
      <TextField
        label="Line 2"
        name="line_2"
        isRequired
        minLength={3}
        maxLength={200}
        defaultValue={data?.line_2 || ""}
      />
      <TextField
        label="Line 3"
        name="line_3"
        isRequired
        minLength={3}
        maxLength={200}
        defaultValue={data?.line_3 || ""}
      />
      {data && <Input hidden readOnly name="address-id" value={data.id}/>}
      
    </>
  );
}
function AddressForm({
  setIsModalOpen,
  defaultData,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  defaultData?: Address;
}) {
  const [formState, formAction, isPending] = useActionState(addAddressAction, {
    success: false,
    errors: {},
  });
  useEffect(() => {
    if (formState.success) {
      setIsModalOpen(false);
      sendNotification({ message: "Address added successfully!" });
    }
  }, [formState]);
  return (
    <Form action={formAction} validationErrors={formState.errors}>
      <span className=" text-title-md">Add New Address</span>
      <AddressFields data={defaultData} />
      <Button className={"font-semibold"} type="submit">
        Submit
      </Button>
      <Button
        variant="destructive"
        className={"font-semibold"}
        onPress={() => setIsModalOpen(false)}
      >
        Cancel
      </Button>
    </Form>
  );
}
function AddressTableWrapper({ addresses }: { addresses: Address[] }) {
  return (
    <>
      <div>
        <div className=" float-right">
          <AddNewThing NewForm={AddressForm} />
        </div>
        <AddressTable addresses={addresses} />
      </div>
    </>
  );
}

function ButtonForm({
  FormComponent,
}: {
  FormComponent: React.ComponentType<{
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  }>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DialogTrigger isOpen={isOpen}>
        <Button className={"m-2"} onPress={() => setIsOpen(true)}>
          Add New
        </Button>
        <Modal>
          <Dialog>
            <FormComponent setIsModalOpen={setIsOpen} />
          </Dialog>
        </Modal>
      </DialogTrigger>
    </>
  );
}

function TestForm({ onClose }: { onClose: () => void }) {
  return <Button onPress={onClose}>close</Button>;
}
