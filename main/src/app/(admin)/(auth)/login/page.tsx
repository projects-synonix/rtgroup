import React, { useActionState } from "react";

import { Metadata } from "next";
import { TextField } from "@/components/react-aria/TextField";
import DarkModeSwitcher from "@/components/Header/DarkModeSwitcher";
import { Button } from "@/components/react-aria/Button";
import { getSession, login } from "@/lib/session";
import { LoginForm } from "./components";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin - Login",
  description: "Login to administration module.",
};

const SignIn: React.FC = async() => {
  const session = await getSession();
  console.log(session);
  if (session.isLoggedIn){
    return redirect("/")
  }
  return(
    <LoginForm/>
  );
};

export default SignIn;
