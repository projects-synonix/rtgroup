import React, { useActionState } from "react";

import { Metadata } from "next";
import { TextField } from "@/components/react-aria/TextField";
import DarkModeSwitcher from "@/components/Header/DarkModeSwitcher";
import { Button } from "@/components/react-aria/Button";
import { login } from "@/lib/session";
import { LoginForm } from "./components";

export const metadata: Metadata = {
  title: "Admin - Login",
  description: "Login to administration module.",
};

const SignIn: React.FC = () => {
  return(
    <LoginForm/>
  );
};

export default SignIn;
