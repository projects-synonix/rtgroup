import React from "react";

import { Metadata } from "next";
import { TextField } from "@/components/react-aria/TextField";
import DarkModeSwitcher from "@/components/Header/DarkModeSwitcher";
import { Button } from "@/components/react-aria/Button";

export const metadata: Metadata = {
  title: "Admin - Login",
  description: "Login to administration module.",
};

const SignIn: React.FC = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-3/4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center justify-center">
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <div className=" float-right p-5">
                <DarkModeSwitcher />
              </div>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to Admin Module
              </h2>

              <form>
                <div className="mb-4">
                  <div className="relative">
                    <TextField
                      label="Username"
                      type="text"
                      isRequired
                      className={"h-20"}
                      placeholder="Enter your username"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <div className="relative">
                    <TextField
                      label="Password"
                      type="password"
                      isRequired
                      className={"h-20"}
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                <div className="mb-5 w-full">
                  <Button className={"w-full"} type="submit">
                    Sign In
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
