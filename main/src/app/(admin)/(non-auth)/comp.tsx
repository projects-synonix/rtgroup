"use client"
import Loader from "@/components/common/Loader";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { SessionData } from "@/lib/session";
import { UserProvider } from "@/lib/user-context";
import { JSX, ReactNode, useEffect, useState } from "react";

export function ClientComponent({children,initialData}:{children:ReactNode,initialData:SessionData}){
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
  
    // const pathname = usePathname();
    // const session = await getSession();
    
    useEffect(() => {
      setTimeout(() => setLoading(false), 1000);
    }, []);
  
    
    return (
            <>
            {loading ? <Loader /> : <UserProvider initialUserData={initialData}><DefaultLayout>{children}</DefaultLayout></UserProvider>}
            </>
  
    );
}