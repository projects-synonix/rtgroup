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
    console.error(dbError.message)
    return null
  }
}

//delete user

//get user
export async function getUser(input: number|string){
  try {
    let result
    if(typeof input === "number"){
      result = await db.selectFrom('user').select(['id','user.username','role','password','random_no']).where('id','=',input).executeTakeFirst();
    }else{
      result = await db.selectFrom('user').select(['id','user.username','role','password','random_no']).where('username','=',input).executeTakeFirst();
    }
    return result
  } catch (error) {
    return null
  }
    
}
