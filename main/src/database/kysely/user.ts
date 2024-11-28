import { db } from "../database";

async function createUser(username:string,password:string) {
    const query = await db.
    insertInto('user')
}