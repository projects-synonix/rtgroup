import { CropperComponent } from "@/components/react-aria/Cropper";
import { Dialog } from "@/components/react-aria/Dialog";
import { DropFiles } from "@/components/react-aria/DropZone";
import { Modal } from "@/components/react-aria/Modal";
import { Component } from "./components";

export default function Page() {
  return (
    <>
      <DropFiles />
      <div className="">
      <Component/>
      </div>
    </>
  );
}
