"use client";
import React, { useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import "./styles.css";
import { FileWithPreview } from "./DropZone";
import { Button } from "./Button";
import { useModalState } from "./Modal";

export type CropperProps = {
  file: File;
  setFile: React.Dispatch<React.SetStateAction<FileWithPreview | null>>;
  aspectRatio: number;
  isModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const CropperComponent = ({
  file,
  setFile,
  // formAction,
  aspectRatio,
  isModalOpen,
}: CropperProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState<Area | null>(null);
  const state = useModalState();
  // Function to create a cropped image file
  const getCroppedImg = async (
    image: string,
    pixelCrop: Area,
  ): Promise<File | null> => {
    const img = await new Promise<HTMLImageElement>((resolve) => {
      const imagee = new Image();
      imagee.addEventListener("load", () => resolve(imagee));
      imagee.src = image;
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    // Set canvas size to match cropped area
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // Draw the cropped image
    ctx.drawImage(
      img,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );

    // Convert canvas to blob
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          resolve(null);
          return;
        }
        // Create a new File from the blob
        const croppedFile = new File([blob], file.name, {
          type: file.type,
          lastModified: Date.now(),
        });
        resolve(croppedFile);
      }, file.type);
    });
  };

  const onCropComplete = async (croppedArea: Area, croppedAreaPixels: Area) => {
    setArea(croppedAreaPixels);
  };

  const cropper = async () => {
    try {
      const croppedImageFile = await getCroppedImg(imgUrl, area!);

      if (croppedImageFile) {
        setFile(
          Object.assign(croppedImageFile, {
            preview: URL.createObjectURL(croppedImageFile),
          }),
        );
        setZoom(1);
        setCrop({ x: 0, y: 0 });

        if (isModalOpen) {
          console.log("eeeeeeeeeeeeeeeeeeeeeeeeeee");
          isModalOpen(false);
        }
      }
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  const imgUrl = URL.createObjectURL(file);
  return (
    <>
      <div className="relative h-96 w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
        <Cropper
          image={imgUrl}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <br />
      <div className="float-right flex gap-2">

        <Button onPress={cropper}>Crop</Button>
        {/* <form action={formAction}>
        <Button variant="success" type="submit">Save</Button>
        </form> */}
      </div>
    </>
  );
};

export { CropperComponent };
