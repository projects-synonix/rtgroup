import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import { Role } from "./authorization";

export type SessionData = {
    username: string;
    isLoggedIn: boolean;
    role: Role;
}

export const defaultSession: SessionData = {
    username: "",
    isLoggedIn: false,
    role: 3
}

export const sessionOptions: SessionOptions = {
    password: process.env.IRON_SESSION_SECRET!,
    cookieName: "ironsession",
}

export async function getSession() {
    const session = await getIronSession<SessionData>(await cookies(),sessionOptions);
    if (!session.isLoggedIn){
        session.isLoggedIn = defaultSession.isLoggedIn;
        session.username = defaultSession.username;
    }

    return session;
}

export async function login() {
    "use server"
    const session = await getSession();
    session.username = "hezline"
    session.isLoggedIn = true;
    session.role = Role.SUPERADMIN;
    await session.save(); 
}

export async function logout() {
    "use server"
    const session = await getSession();
    session.destroy();
}