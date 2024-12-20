import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen">
      <Breadcrumb pageName="Basic Details & Contact Information" />
      {children}
    </div>
  );
}
