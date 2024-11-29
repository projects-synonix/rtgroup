import { db } from "@/database/database";
import { QueryError } from "mysql2";
import { Role } from "./authorization";
import { hashPassword, verifyPasswordHash } from "./password";

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
    const dbError = error as QueryError;
    console.error(dbError.message);
    return null;
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
    return result;
  } catch (error) {
    return null;
  }
}


export type User = {
  id: number;
  name: string;
  role: Role;
}

// lib/user-context.tsx
