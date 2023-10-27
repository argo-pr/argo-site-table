import SignIn from "@/components/auth/SignIn";
import {getUserAuth} from "@/lib/auth/utils";
import CreateUserCard from "@/components/CreateUserCard";

export default async function Home() {
    const {session} = await getUserAuth();
    return (
        <main className="space-y-4 pt-2">
            {session ? (
                <>
                    <CreateUserCard/>
                </>


            ) : null}
            <SignIn/>
        </main>
    );
}
