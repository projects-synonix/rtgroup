"use server"

import { getSession } from "@/lib/session"
import { cookies } from "next/headers"

export async function testAction(prevState:any,formData:FormData){
    console.log(formData)
    const file = formData.get('file') as File;
    console.log(file,'---------====',file.name,file.size);
    return null
}