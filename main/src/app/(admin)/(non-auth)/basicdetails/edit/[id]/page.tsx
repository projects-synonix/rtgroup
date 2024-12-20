import { getAddress } from "@/lib/contact_info";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  
  const address = getAddress(parseInt(id));
  return <>hello</>;
}
