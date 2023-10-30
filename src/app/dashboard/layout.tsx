import {getUserAuth} from "@/lib/auth/utils";
import {Data} from "@/components/DataTable";
import {UserContext} from "@/app/dashboard/userContext";
import ContextProvider from "@/app/dashboard/ContextProvider";
import {findOrdersByUserId} from "@/app/server/order";

export default async function DashboardLayout(props: {
    children: React.ReactNode
    admin: React.ReactNode
    user: React.ReactNode
    params: { data: Data[] }
}) {
    const {session} = await getUserAuth()

    const data = await findOrdersByUserId(session?.user.id!)

    return <ContextProvider data={data}>
        {session?.user.role === "ADMIN" ? (
            <>{props.admin}</>
        ) : (
            <>{props.user}</>
        )}
    </ContextProvider>
}