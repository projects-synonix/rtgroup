import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getBasicDetails } from "@/lib/basic_details";
import { TextArea } from "react-aria-components";
import { BasicDetailComponent } from "./components";
import { getSocialMediaIcon } from "@/lib/utils";

export default async function Page() {
  const details = await getBasicDetails();
  return (
    <>
      <Breadcrumb pageName="Basic Details & Contact Information" />
      <BasicDetailComponent details={details!}/>
    </>
  );
}
