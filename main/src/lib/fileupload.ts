"use server";

import { createWriteStream, unlink, promises as fss } from "fs";
import { pipeline, Readable } from "stream";
import { promisify } from "util";
import path from "path";
import { Module, menuConfig as moduleSettings } from "./menu";
import { getFilePath } from "./utils";
const pipelineAsync = promisify(pipeline);

export async function uploadFile(file:File, module: Module) {

  const targetPath = path.join(process.cwd(),'/public', getFilePath({module})); // Directory to save the file
  let filename = `upload-${Date.now()}-${file.name}`;
  let filePath = path.join(targetPath, filename);
  while(await fileExists(filePath)){
    filename = `upload-${Date.now()}-${file.name}`;
    filePath = path.join(targetPath, filename);
  }
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

export async function deleteFile(module:Module,fileName:string){
  const targetPath = path.join(process.cwd(),'/public',getFilePath({module,fileName}));
  unlink(targetPath,(err=>{
    if(err){
      throw new Error(`Unable to delete file, cause: ${err.cause}, msg: ${err.message}`);
    }else{
      console.log(targetPath, 'deleted')
    }
  }))
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fss.access(filePath, fss.constants.F_OK);
    return true;
  } catch (error: unknown) {
    if (error instanceof Error && 'code' in error && (error as NodeJS.ErrnoException).code === 'ENOENT') {
      return false; // File doesn't exist
    }
    throw error; // Re-throw other potential errors
  }
}