
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader/index";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { UserProvider } from "@/lib/user-context";
import { cookies } from "next/headers";
import { getSession } from "@/lib/session";
import { Role } from "@/lib/authorization";
import { ClientComponent } from "./comp";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  // const pathname = usePathname();
  const session = await getSession();
  if(!session.isLoggedIn){
    return redirect('/login');
  }


  const initialUserData = {
    id: session.id,
    username: session.username,
    role: session.role, // Default role
    isLoggedIn: session.isLoggedIn
  };
  
  return (
          <ClientComponent initialData={initialUserData}>{children}</ClientComponent>

  );
}
