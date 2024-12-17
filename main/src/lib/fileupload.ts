"use server";

import { createWriteStream } from "fs";
import { pipeline, Readable } from "stream";
import { promisify } from "util";
import path from "path";
import { Module, menuConfig as moduleSettings } from "./menu";
import { getFilePath } from "./utils";
const pipelineAsync = promisify(pipeline);

export async function uploadFile(file:File, module: Module) {

  const targetPath = path.join(process.cwd(), getFilePath({module})); // Directory to save the file
  const filename = `upload-${Date.now()}-${file.name}`;
  const filePath = path.join(targetPath, filename);

  try {
    const buffer = await file.arrayBuffer(); // Convert the File object to a buffer
    await pipelineAsync(
      Readable.from(Buffer.from(buffer)), // Readable stream from the buffer
      createWriteStream(filePath), // Write stream to the target file
    );
    return filename;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
}



