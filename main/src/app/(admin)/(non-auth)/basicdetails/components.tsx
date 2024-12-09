"use client";
import { TextField, TextFieldArea } from "@/components/react-aria/TextField";
import { BasicDetails } from "@/types/kysely";

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

