import { Role } from "@/lib/authorization";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await getSession();
    if (!session.isLoggedIn){
        return redirect('/login');
    }
    if (!Role.hasActionAccess('secret','read',session.role)){
        return redirect('/');
    }
    return <>welcome to secret page</>
}