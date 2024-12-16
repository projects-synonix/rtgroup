"use client";
import { Button } from "@/components/react-aria/Button";
import { TextField, TextFieldArea } from "@/components/react-aria/TextField";
import { BasicDetails } from "@/types/kysely";
import { Pencil } from "lucide-react";
import { useActionState, useState } from "react";
import { ImageUpload } from "@/components/react-aria/DropZone";
import { Form } from "@/components/react-aria/Form";
import { testAction } from "./actions";
import { Tab, TabList, TabPanel, Tabs } from "@/components/react-aria/Tabs";
import Image from "next/image";
import path from "path";
import { getFilePath } from "@/lib/utils";

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
      <TabPanel id="contact">Contact info table goes here.</TabPanel>
    </Tabs>
  );
}

export function BasicDetailsView({ details }: { details: BasicDetails }) {
  const logo_url = path.join(getFilePath("basicdetails"), details.logo_url!);
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
        <ImageUpload />
        <Button type="submit">submit</Button>
      </Form>
    </>
  );
}
