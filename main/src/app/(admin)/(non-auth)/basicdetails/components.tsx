"use client";
import { Button } from "@/components/react-aria/Button";
import { TextField, TextFieldArea } from "@/components/react-aria/TextField";
import { BasicDetails } from "@/types/kysely";
import { Pencil } from "lucide-react";
import { useActionState, useState } from "react";
import { ImageUpload } from "@/components/react-aria/DropZone";
import { Form } from "@/components/react-aria/Form";
import { testAction } from "./actions";

export function BasicDetailComponent({ details }: { details: BasicDetails }) {
    const [companyName,setCompanyName] = useState<string>(details.company_name);
    const [editStatus,setEditStatus] = useState(false);
    const [aboutUs,setAboutUs] = useState<string>(details.about_us!);
    const[errMsg,formAction,isPending] = useActionState(testAction,null);
  return (
    <>
    <div className="flex">

      <TextField className={'w-fit'}value={details.company_name!} isReadOnly/>
      <Button variant="icon"><Pencil /></Button>
    </div>
      <TextFieldArea
        rows={5}
        cols={50}
        className={" bg: border-stroke dark:border-strokedark"}
        name="about_us"
      />
      <Form action={formAction}>
        <TextField value="hekkii" name="hello"/>
        <ImageUpload/>
        <Button type="submit">submit</Button>
      </Form>
    </>
  );
}

