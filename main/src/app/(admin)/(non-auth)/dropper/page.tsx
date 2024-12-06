import { CropperComponent } from "@/components/react-aria/Cropper";
import { Dialog } from "@/components/react-aria/Dialog";
import { ImageUpload } from "@/components/react-aria/DropZone";
import { Modal } from "@/components/react-aria/Modal";
import { Component } from "./components";

export default function Page() {
  return (
    <div className="min-h-screen">
      <ImageUpload />
    </div>
  );
}
