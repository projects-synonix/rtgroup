"use server"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { CircleUser } from "lucide-react";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Role } from "@/lib/authorization";
import { Disclosure, DisclosureHeader, DisclosurePanel } from "@/components/react-aria/Disclosure";
import { ChangePassDisclosure } from "./components";


export default async function Page(){
  const session = await getSession();
  if(!session.isLoggedIn){
    return redirect("/login");
  }
  if(!Role.hasActionAccess('profile','read',session.role)){
    return redirect("/");
  }
  return (
    <div className="mx-auto max-w-242.5 min-h-screen">
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-50">
          <Image
            src={"/images/cover/cover-01.png"}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            width={970}
            height={260}
          />
          <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4"></div>
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <CircleUser className="w-full h-full" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold capitalize text-black dark:text-white">
              {session.username}
            </h3>
            <p className="font-medium capitalize">{Role.getUserRoleName(session.role)}</p>
          </div>
        </div>
        <ChangePassDisclosure/>
      </div>
    </div>
  );
};



