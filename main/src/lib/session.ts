"use server";
import { getIronSession, SessionOptions } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Role } from "./authorization";
import { verifyPasswordHash } from "./password";
import { getUser } from "./user";

export type SessionData = {
  id: number;
  username: string;
  isLoggedIn: boolean;
  role: Role;
};

const defaultSession: SessionData = {
  username: "",
  isLoggedIn: false,
  role: 0,
  id:0,
};

const sessionOptions: SessionOptions = {
  password: process.env.IRON_SESSION_SECRET!,
  cookieName: "ironsession",
};

export async function getSession() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );
  return session;
}

export async function login(prevState: any, formdata: FormData) {
  const username = formdata.get("username") as string;
  const password = formdata.get("password") as string;
  console.log(typeof username, password);
  let user = await getUser(username);
  if (!user) {
    return "Invalid username/password.";
  }

  if (!(await verifyPasswordHash(user.password, password))) {
    return "Invalid username/password.";
  }
  const session = await getSession();
  session.username = user.username;
  session.isLoggedIn = true;
  session.role = user.role;
  await session.save();
  revalidatePath("/");
  return redirect('/');
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  return redirect("/login")
}
