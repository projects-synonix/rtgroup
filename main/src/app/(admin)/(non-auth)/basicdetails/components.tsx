"use client";
import { Label } from "@/components/react-aria/Field";
import { TextField, TextFieldArea } from "@/components/react-aria/TextField";
import { BasicDetails } from "@/types/kysely";
import { TextArea } from "react-aria-components";

export function BasicDetailComponent({ details }: { details: BasicDetails }) {
    
  return (
    <>
      <TextField className={'w-fit'}value={details.company_name!} isReadOnly label="Company Name"/>
      <TextFieldArea
        rows={5}
        cols={50}
        className={" bg: border-stroke dark:border-strokedark"}
        name="about_us"
      />
    </>
  );
}

