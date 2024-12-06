"use server";

import { createWriteStream } from "fs";
import { pipeline, Readable } from "stream";
import { promisify } from "util";
import path from "path";

const pipelineAsync = promisify(pipeline);

export async function uploadFile(prevState:any,formData: FormData) {
    console.log(formData,"===================")
  const file = formData.get("file") as File;
  const targetPath = path.join(process.cwd(), "public/uploads"); // Directory to save the file
  const filename = `upload-${Date.now()}-${file.name}`;
  const filePath = path.join(targetPath, filename);

  try {
    const buffer = await file.arrayBuffer(); // Convert the File object to a buffer
    await pipelineAsync(
      Readable.from(Buffer.from(buffer)), // Readable stream from the buffer
      createWriteStream(filePath), // Write stream to the target file
    );
    return { success: true, filePath: `/uploads/${filename}` };
  } catch (error) {
    console.error("Error uploading file:", error);
    return { success: false, error: "File upload failed" };
  }
}
