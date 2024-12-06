import { db } from "@/database/database";
import { QueryError } from "mysql2";
import { Role } from "./authorization";
import { hashPassword, verifyPasswordHash } from "./password";
import { throwDBError } from "./utils";
import { getSession, SessionData } from "./session";
import { z } from "zod";

// create user
export async function createUser(
  username: string,
  password: string,
  role: Role,
) {
  password = await hashPassword(password);
  try {
    let query = await db
      .insertInto("user")
      .values({
        username,
        password,
        role,
      })
      .executeTakeFirst();
    return query.insertId;
  } catch (error) {
    throwDBError(error as QueryError);
  }
}

//delete user

//get user
export async function getUser(input: number | string) {
  try {
    const result = await db
      .selectFrom("user")
      .select(["id", "user.username", "role", "password", "random_no"])
      .where(typeof input === "number" ? "id" : "username", "=", input)
      .executeTakeFirst();
    console.log(result, "res");
    return result;
  } catch (error) {
    throwDBError(error as QueryError);
  }
}

const ChangePassSchema = z.object({
  oldpassword: z.string().min(1),
  newpassword: z.string().min(6).max(20),
  confirmpassword: z.string().min(6).max(20),
});

export type ChangePassResult = { success: boolean; message: string };

export async function changePassword(
  formData: FormData,id:number
): Promise<ChangePassResult> {
  const oldPass = formData.get("oldpassword") as string;
  const newPass1 = formData.get("newpassword") as string;
  const newPass2 = formData.get("confirmpassword") as string;

  if (newPass1 !== newPass2) {
    return { success: false, message: "Passwords doesn't match." };
  }
  const user = await getUser(id);
  console.log(user?.password);
  if (!await verifyPasswordHash(user?.password!, oldPass)) {
    console.log('aaaaaaaaaaaaaaaaa')
    return { success: false, message: "Incorrect old password." };
  }
  const hashpass = await hashPassword(newPass1);
  try {
    
    const res = await db
      .updateTable("user")
      .set({ password: hashpass })
      .where("id", "=", id)
      .executeTakeFirst();
  } catch (error) {
    throwDBError(error as QueryError);
  }
  return { success: true, message: "Password changed successfully." };
}

export type User = {
  id: number;
  name: string;
  role: Role;
};

// lib/user-context.tsx
