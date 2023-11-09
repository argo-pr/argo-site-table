import {getUserAuth} from "@/lib/auth/utils";
import CreateUserCard from "@/components/CreateUserCard";

export default async function Home() {
    const {session} = await getUserAuth();
    return (
        <>
        </>
    );
}
