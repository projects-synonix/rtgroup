import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getBasicDetails } from "@/lib/basic_details";
import { TextArea } from "react-aria-components";
import { BasicDetailComponent, TabView } from "./components";
import { getSocialMediaIcon } from "@/lib/utils";
import { getAddress } from "@/lib/contact_info";
import { Address } from "@/types/kysely";

export default async function Page() {
  const details = await getBasicDetails();
  const addresses = await getAddress() as Address[] ?? [];
  return (
    <>
      <Breadcrumb pageName="Basic Details & Contact Information" />
      {/* <BasicDetailComponent details={details!}/> */}
      <TabView details={details!} addresses={addresses}/>

    </>
  );
}
