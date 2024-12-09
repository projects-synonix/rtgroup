"use server"

import { getSession } from "@/lib/session"
import { changePassword } from "@/lib/user"
import { cookies } from "next/headers";

export async function changePassAaction(prevState:any,formData:FormData) {
    const session = await getSession();
    return await changePassword(formData,session.id);
}