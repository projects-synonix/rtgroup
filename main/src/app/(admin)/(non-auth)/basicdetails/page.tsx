import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getBasicDetails } from "@/lib/basic_details";
import { TextArea } from "react-aria-components";
import { BasicDetailComponent } from "./components";

export default async function Page() {
  const details = await getBasicDetails();
  console.log(details,'basic details..................')
  return (
    <>
      <Breadcrumb pageName="Basic Details & Contact Information" />
      <BasicDetailComponent details={details!}/>
    </>
  );
}
