"use client";
import { TextArea, TextField } from "react-aria-components";

export function BasicDetailComponent() {
  return (
    <>
      <TextField>
        <TextArea
          rows={5}
          cols={50}
          className={" bg: border-stroke dark:border-strokedark"}
          name="about_us"
        />
      </TextField>
    </>
  );
}
