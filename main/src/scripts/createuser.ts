import { Role } from "@/lib/authorization";
import { createUser, getUser } from "@/lib/user";

const args = require('minimist')(process.argv.slice(2));

// Access the named arguments
const username = args.username;
const password = args.password;
const role = Role.SUPERADMIN;

export async function test(){
    console.log(password,typeof password)

        await createUser(username,password,role);
        // await getUser(1);
}
test().then(()=>{console.log("finished running script");process.exit()});