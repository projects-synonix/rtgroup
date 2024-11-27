import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getSession, login, logout } from "@/lib/session";

export default async function Page(){
    const session = await getSession();
    if (session.isLoggedIn){
        return <div>
            <DefaultLayout>
            logged in user : {session.username}, role: {session.role}
            <form action={logout}>
                <button type="submit">logout</button>
            </form>

            </DefaultLayout>
        </div>
    }else{
        return <form action={login}>
            <button type="submit">login</button>
        </form>
    }
}