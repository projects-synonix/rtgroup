"use server";

import { db } from "@/database/database";
import { updateBasicDetails } from "@/lib/basic_details";
import { deleteFile, uploadFile } from "@/lib/fileupload";
import { menuConfig } from "@/lib/menu";
import { revalidatePath } from "next/cache";
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
export type FormState = {
  success: boolean;
  errors?: Record<string, string>;
};
export async function basicDetailUpdateAction(
  prevState: any,
  formData: FormData,
) {
  let file = formData.get("file2") as File;
  let oldFileName = formData.get("old_file_name") as string;
  let data: BasicDetailSchemaType = {
    company_name: formData.get("company_name") as string,
    about_us: formData.get("about_us") as string,
    file_size: file?.size === undefined ? 0 : file.size,
  };

  console.log(data, "data");
  let result = BasicDetailSchema.safeParse(data);
  if (result.success) {
    let logo_url;
    if (file !== undefined && file !== null) {
      // delete old file
      await deleteFile("basicdetails", oldFileName);
      logo_url = await uploadFile(file, "basicdetails");
    }
    let res = await updateBasicDetails({
      about_us: data.about_us,
      company_name: data.company_name,
      ...(logo_url && { logo_url: logo_url }),
    });
    revalidatePath(menuConfig.basicdetails.route);
    return { success: true };
  } else {
    console.log(result.error.flatten().fieldErrors);
  }
}

const AddressScehma = z.object({
  line_1: z.string().min(3).max(200),
  line_2: z.string().min(3).max(200),
  line_3: z.string().min(3).max(200),
});
export async function addAddressAction(
  prevState: any,
  formData: FormData,
): Promise<FormState> {
  const result = AddressScehma.safeParse({
    line_1: formData.get("line_1") as string,
    line_2: formData.get("line_2") as string,
    line_3: formData.get("line_3") as string,
  });
  if (!result.success) {
    return {
      success: false,
    };
  } else {
    try {
      await db
        .insertInto("address")
        .values({
          line_1: result.data.line_1,
          line_2: result.data.line_2,
          line_3: result.data.line_3,
        })
        .execute();
        revalidatePath(menuConfig.basicdetails.route);
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  }
}
