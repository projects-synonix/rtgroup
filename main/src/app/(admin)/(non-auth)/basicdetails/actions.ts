"use server";

import { updateBasicDetails } from "@/lib/basic_details";
import { uploadFile } from "@/lib/fileupload";
import { menuConfig } from "@/lib/menu";
import { getSession } from "@/lib/session";
import { unlink } from "fs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const BasicDetailSchema = z.object({
  company_name: z
    .string()
    .min(3, { message: "Must be 3-100 characters long" })
    .max(100, { message: "Must be 3-100 characters long" }),
  about_us: z
    .string()
    .max(1000, { message: "Must 1000 or fewer characters long" }),
  file_size: z
    .number()
    .lte(5242880, { message: "File size should be less than 5MB" }),
});

type BasicDetailSchemaType = z.infer<typeof BasicDetailSchema>;

export async function testAction(prevState: any, formData: FormData) {
  let file = formData.get("file2") as File;
  console.log(file)
  let data: BasicDetailSchemaType = {
    company_name: formData.get("company_name") as string,
    about_us: formData.get("about_us") as string,
    file_size: file.size === undefined ? 0 : file.size,
  };
  console.log(data,'data')
  let result = BasicDetailSchema.safeParse(data);
  if (result.success) {
    let filenamereturned;
    if (file !== undefined && file !== null) {
      file = new File([file], "logo"); // to replace the old
      filenamereturned = await uploadFile(file, "basicdetails", true);
    }
    let res = await updateBasicDetails({
      about_us: data.about_us,
      company_name: data.company_name,
      ...(filenamereturned && { logo_url: filenamereturned }),
    });
    revalidatePath(menuConfig.basicdetails.route);
    return { success: true };
  }else{
    console.log(result.error.flatten().fieldErrors)
  }
}
