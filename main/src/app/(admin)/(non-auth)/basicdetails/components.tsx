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

export function BasicDetailComponent({ details }: { details: BasicDetails }) {
  const [companyName, setCompanyName] = useState<string>(details.company_name);
  const [editStatus, setEditStatus] = useState(false);
  const [aboutUs, setAboutUs] = useState<string>(details.about_us!);
  const [errMsg, formAction, isPending] = useActionState(testAction, null);
  return (
    <>
    {editStatus ?  
    
      <Form action={formAction}>
        <div className="flex">

          <TextField className={'w-fit'} value={details.company_name!} isReadOnly />
          <Button variant="icon"><Pencil /></Button>
        </div>
        <TextFieldArea
          rows={5}
          cols={50}
          className={" bg: border-stroke dark:border-strokedark"}
          name="about_us"
        />
        {/* <TextField value="hekkii" name="hello"/> */}
        <ImageUpload />
        <Button type="submit">submit</Button>
      </Form> : <BasicDetailsView details={details}/>
    }
    </>
  );
}

export function TabView({ details }: { details: BasicDetails }) {
  return (
    <Tabs>
      <TabList>
        <Tab id="basicdetails">Basic Details</Tab>
        <Tab id='contact'>Contact Information</Tab>
      </TabList>
      <TabPanel id='basicdetails'>
        <BasicDetailComponent details={details} />
      </TabPanel>
      <TabPanel id="contact">
        Contact info table goes here.
      </TabPanel>
    </Tabs>
  )
}

export function BasicDetailsView({ details }: { details: BasicDetails }) {
  return (
    <div className="border-2 drop-shadow-2 p-2 rounded-md">
      <div className=' text-body dark:text-bodydark font-medium'> Company Name</div>
      <div className=" font-semibold">{details.company_name}</div>
      <br />
      <div className=' text-body dark:text-bodydark font-medium'> About Us</div>
      <div className="font-medium max-h-40 overflow-scroll"> {details.about_us}</div>
      <br />
      <span className="text-body dark:text-bodydark font-medium">Logo</span>
      <Image src={'/pulic/uploads'} width={200} height={200} alt={'logo url'}/>
    </div>
  )
}