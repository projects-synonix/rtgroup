"use client";
import React, { useEffect, useState } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { Button } from "./Button";
import { CropperComponent } from "./Cropper";

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

type FileWithPreview = File & { preview?: string };

export function DropFiles() {
  const [file, setFile] = useState<FileWithPreview | null>(null);

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
    },
    onDragEnter: () => {},
    onDragOver: () => {},
    onDragLeave: () => {},
  } as DropzoneOptions);
  console.log(file, typeof file);
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
          <Button variant="icon" onPress={() => setFile(null)}>
            X
          </Button>
        </div>
      </div>
    );

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => URL.revokeObjectURL(file?.preview!);
  }, [file]);

  return (
    <>
      <section className="container h-auto rounded-md border-2 border-gray-400 bg-gray-100 p-2 shadow-1 shadow-gray-300 drop-shadow-xl dark:bg-gray-800">
        <div {...getRootProps({ className: "dropzone w-full h-32" })}>
          <input {...getInputProps({})} className="w-full bg-red-100" />
          <p className="h-32 bg-gray-300 text-center dark:bg-gray-600">
            Drag 'n' drop some files here, or click to select files
          </p>
        </div>
        <div style={thumbsContainer}>{thumbs}</div>
      </section>
      {file && <>
        <CropperComponent file={file}/>
      </>}
    </>
  );
}

{
  /* <DropFiles />; */
}
