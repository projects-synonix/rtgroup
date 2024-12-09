"use client";
import {
  Disclosure,
  DisclosureHeader,
  DisclosurePanel,
} from "@/components/react-aria/Disclosure";
import { Form } from "@/components/react-aria/Form";
import { useActionState } from "react";
import { changePassAaction } from "./action";
import { TextField } from "@/components/react-aria/TextField";
import { Button } from "@/components/react-aria/Button";

function ChangePassForm() {
  const [formState, formAction, isPending] = useActionState(changePassAaction, {
    success: false,
    message: "",
  });
  return (
    <>
      <Form action={formAction}>
        <TextField
          type="password"
          isRequired
          name="oldpassword"
          label="Current Password"
          placeholder="Enter current password"
        />
        <TextField
          type="password"
          isRequired
          name="newpassword"
          label="New Password"
          placeholder="Enter new password"
          minLength={6}
          maxLength={20}
        />
        <TextField
          type="password"
          isRequired
          name="confirmpassword"
          label="Confirm Password"
          placeholder="Enter new password again"
          minLength={6}
          maxLength={20}
        />
        <Button variant="success" type="submit">
          Submit
        </Button>
        {!formState.success && (
          <p className="text-sm text-red-600 forced-colors:text-[Mark]">
            {formState.message}
          </p>
        )}
        {formState.success && 
        <p className="text-sm text-green-600 forced-colors:text-[Mark]">
        {formState.message}
      </p>}
      </Form>
    </>
  );
}

export function ChangePassDisclosure() {
  return (
    <>
      <Disclosure>
        <DisclosureHeader>Change Password</DisclosureHeader>
        <DisclosurePanel>
          <ChangePassForm />
        </DisclosurePanel>
      </Disclosure>
    </>
  );
}
