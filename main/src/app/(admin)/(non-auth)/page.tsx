import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title:
    "Admin Panel",
  description: "",
};

export default function Home() {
  return (
    <>
        <ECommerce />
    </>
  );
}
