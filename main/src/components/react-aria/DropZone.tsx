"use client";
import React, { useActionState, useEffect, useRef, useState } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { Button } from "./Button";
import { CropperComponent } from "./Cropper";
import { uploadFile } from "@/lib/fileupload";
import { Input } from "react-aria-components";

const thumbsContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb: React.CSSProperties = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: "auto",
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  overflow: "hidden",
};

const img: React.CSSProperties = {
  display: "block",
  width: "100%",
  height: "auto",
};

export type FileWithPreview = File & { preview?: string };

export function ImageUpload({
  file,
  setFile,
}: {
  file: FileWithPreview | null;
  setFile: React.Dispatch<React.SetStateAction<FileWithPreview | null>>;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => console.log(fileInputRef.current, "refffff"), []);
  const { getRootProps, getInputProps } = useDropzone({
    // no multiple file support
    multiple: false,
    accept: { "image/*": [] },
    onDrop: (acceptedFiles: File[]) => {
      setFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        }),
      );
      if (fileInputRef.current) {
        let dataTransfer = new DataTransfer();
        dataTransfer.items.add(acceptedFiles[0]);
        fileInputRef.current.files = dataTransfer.files;
      }
    },
    onDragEnter: () => {},
    onDragOver: () => {},
    onDragLeave: () => {},
  } as DropzoneOptions);
  // console.log(file, file?.name);

  const thumbs =
    file === null ? (
      <></>
    ) : (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
            onLoad={() => {
              URL.revokeObjectURL(file.preview!);
            }}
          />
          <Button
            variant="icon"
            className={" font-bold text-red"}
            onPress={() => setFile(null)}
          >
            Remove
          </Button>
        </div>
      </div>
    );

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => URL.revokeObjectURL(file?.preview!);
  }, [file]);

  // const [errorMsg, formAction, isPending] = useActionState(uploadFile, null);
  // const onSubmit = async (formData: FormData) => {
  //   formData.append("file", file!);
  //   console.log(formData, "-----=======");
  //   let res = await formAction(formData);
  //   console.log(res);
  // };

  return (
    <>
      <section className="h-auto w-full rounded-md border-2 border-gray-400  bg-gray-100 p-2 shadow-1 shadow-gray-300 drop-shadow-xl dark:bg-gray-800">
        <div {...getRootProps({ className: "dropzone w-full h-32" })}>
          <input {...getInputProps({})} className="w-full bg-red-100" />
          <p className="h-32 bg-gray-300 text-center dark:bg-gray-600">
            Drag n drop some files here, or click to select files
          </p>
        </div>
        <div style={thumbsContainer}>{thumbs}</div>
      </section>
      {/* hidden input for form */}
      <Input ref={fileInputRef} name="file" type="file" className={"hidden"} />
      {file && (
        <>
          <CropperComponent
            file={file}
            setFile={setFile}
            inputRef={fileInputRef}
            aspectRatio={16/9}
            // formAction={onSubmit}
          />
        </>
      )}
    </>
  );
}

