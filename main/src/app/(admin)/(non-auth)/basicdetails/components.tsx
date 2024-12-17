"use client";
import { Button } from "@/components/react-aria/Button";
import { TextField, TextFieldArea } from "@/components/react-aria/TextField";
import { BasicDetails } from "@/types/kysely";
import { Pencil, SaveIcon, Upload } from "lucide-react";
import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { FileWithPreview, ImageUpload } from "@/components/react-aria/DropZone";
import { Form } from "@/components/react-aria/Form";
import { testAction } from "./actions";
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

export function BasicDetailComponent({ details }: { details: BasicDetails }) {
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      <div className="rounded-md border-2 p-2 drop-shadow-2">
        {editMode ? (
          <EditBasicDetailView details={details} />
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

export function TabView({ details }: { details: BasicDetails }) {
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
        <ContactListView />
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
      <Image src={logo_url} width={100} height={100} alt={"logo url"} />
    </>
  );
}

function EditBasicDetailView({ details }: { details: BasicDetails }) {
  const [errMsg, formAction, isPending] = useActionState(testAction, null);
  const [file, setFile] = useState<FileWithPreview | null>(null);
  return (
    <>
      <Form action={formAction}>
        <TextField
          className={"w-fit"}
          defaultValue={details.company_name}
          label="Company Name"
        />

        <TextFieldArea
          rows={5}
          cols={50}
          className={" bg: border-stroke dark:border-strokedark"}
          name="about_us"
          label="About Us"
          defaultValue={details.about_us}
        />
        {/* <TextField value="hekkii" name="hello"/> */}
        {/* <ImageUpload file={file} setFile={setFile} /> */}
        <ImageChangeWithCrop
          url={getFilePath({
            module: "basicdetails",
            fileName: details.logo_url!,
          })}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </>
  );
}

function ImageChangeWithCrop({ url }: { url: string }) {
  // show a preview of image and an file input
  // if a new file is added to input use that image for preview
  // if the file is removed, show the preview from url.
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (file === null && inputRef.current !== null) {
      inputRef.current.files = null;
    }
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => URL.revokeObjectURL(file?.preview!);
  }, [file]);
  console.log("current file in input", inputRef.current?.files);
  return (
    <>
      <Label>Logo</Label>
      <div className="relative flex gap-2 items-center">
        {file === null ? (
          <Image src={url} width={100} height={100} alt="Image unavailable" />
        ) : (
          <div className="flex flex-col justify-center">
            <Image
              src={file.preview!}
              width={100}
              height={100}
              alt="Unable to show preview"
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
        {file &&
        <input
          name="file"
          type="file"
          className="hidden"
          multiple={false}
          ref={inputRef}
        />
        
        }
        <FileTrigger
          acceptedFileTypes={["image/*"]}
          onSelect={(e) => {
            if (e) {
              setFile(fileToFileWithPreview(e.item(0)!));
              if (inputRef.current) {
                inputRef.current.files = e;
              }
              setIsOpen(!isOpen);
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
                  inputRef={inputRef}
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

function ContactListView() {
  //
  return (
    <>
      <DisclosureGroup>
        <Disclosure>
          <DisclosureHeader>Addresses</DisclosureHeader>
          <DisclosurePanel>
            <Example />
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

let rows = [
  { id: 1, name: "Games", date: "6/7/2020", type: "File folder" },
  { id: 2, name: "Program Files", date: "4/7/2021", type: "File folder" },
  { id: 3, name: "bootmgr", date: "11/20/2010", type: "System file" },
  { id: 4, name: "log.txt", date: "1/18/2016", type: "Text Document" },
  { id: 5, name: "Proposal.ppt", date: "6/18/2022", type: "PowerPoint file" },
  { id: 6, name: "Taxes.pdf", date: "12/6/2023", type: "PDF Document" },
  { id: 7, name: "Photos", date: "8/2/2021", type: "File folder" },
  { id: 8, name: "Documents", date: "3/18/2023", type: "File folder" },
  { id: 9, name: "Budget.xls", date: "1/6/2024", type: "Excel file" },
];

export const Example = (args: any) => {
  let [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "ascending",
  });

  let items = useMemo(() => {
    let items = rows.slice().sort((a, b) =>
      // @ts-ignore
      a[sortDescriptor.column].localeCompare(b[sortDescriptor.column]),
    );
    if (sortDescriptor.direction === "descending") {
      items.reverse();
    }
    return items;
  }, [sortDescriptor]);

  return (
    <Table
      aria-label="Files"
      {...args}
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
    >
      <TableHeader>
        <Column id="name" isRowHeader allowsSorting>
          Name
        </Column>
        <Column id="type" allowsSorting>
          Type
        </Column>
        <Column id="date" allowsSorting>
          Date Modified
        </Column>
      </TableHeader>
      <TableBody items={items}>
        {(row) => (
          <Row>
            <Cell>{row.name}</Cell>
            <Cell>{row.type}</Cell>
            <Cell>{row.date}</Cell>
          </Row>
        )}
      </TableBody>
    </Table>
  );
};
