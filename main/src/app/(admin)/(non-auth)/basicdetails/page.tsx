import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getBasicDetails } from "@/lib/basic_details";
import { TextArea } from "react-aria-components";
import { BasicDetailComponent, TabView } from "./components";
import { getSocialMediaIcon } from "@/lib/utils";
import { getAddress, getPhone } from "@/lib/contact_info";
import { Address, Phone } from "@/types/kysely";

export default async function Page() {
  const details = await getBasicDetails();
  const addresses = await getAddress() as Address[] ?? [];
  const phones = await getPhone() as Phone[] ?? [];
  return (
    <>
      <TabView details={details!} addresses={addresses} phones={phones}/>
    </>
  );
}
