"use server";

import { db } from "@/database/database";

export async function getAddress(id?: number) {
  try {
    let query = db
      .selectFrom("address")
      .select(["id", "line_1", "line_2", "line_3"]);

    if (id !== undefined) {
      return await query.where("id", "=", id).executeTakeFirst();
    } else {
      return await query.execute();
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function getPhone(id?: number) {
  try {
    let query = db.selectFrom("phone").select(["id", "phone"]);

    if (id !== undefined) {
      return await query.where("id", "=", id).executeTakeFirst();
    } else {
      return await query.execute();
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function getEmail(id?: number) {
  try {
    let query = db.selectFrom("email").select(["id", "email"]);

    if (id !== undefined) {
      return await query.where("id", "=", id).executeTakeFirst();
    } else {
      return await query.execute();
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
