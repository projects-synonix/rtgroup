"use client"

import DarkModeSwitcher from "@/components/Header/DarkModeSwitcher";
import { Button } from "@/components/react-aria/Button";
import { TextField } from "@/components/react-aria/TextField";
import { login } from "@/lib/session";
import { useActionState } from "react";

export function LoginForm(){
    const [errorMsg, formAction, isPending] = useActionState(login,null);
        return (
          <div className="flex h-screen w-full items-center justify-center">
            <div className="w-3/4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex flex-wrap items-center justify-center">
                <div className="w-full border-stroke dark:border-strokedark xl:w-1/2">
                  <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                    <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                      Sign In to Admin Module
                    </h2>
      
                    <form action={formAction}>
                      <div className="mb-4">
                        <div className="relative">
                          <TextField
                            label="Username"
                            name="username"
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
                            name="password"
                            isRequired
                            className={"h-20"}
                            placeholder="Enter your password"
                          />
                        </div>
                      </div>
      
                      <div className="mb-5 w-full">
                        <Button className={"w-full"} type="submit"
                          isDisabled={isPending}
                        >
                          Sign In
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
}