import {getUserAuth} from "@/lib/auth/utils";
import ContextProvider from "@/app/dashboard/ContextProvider";
import {findOrdersByUserId, getAllOrders} from "@/app/server/order";
import {IContext} from "../../../types/custom-types";
import type {ReactNode} from "react";
import {getAllUsers} from "@/app/server/user";

export default async function DashboardLayout(props: {
    children: ReactNode
    admin: ReactNode
    user: ReactNode
}) {
    const {session} = await getUserAuth()

    let orders: IContext["orderStore"] = []
    let users: IContext["userStore"] = []

    if (session?.user.role === "ADMIN") {
        const res = await getAllUsers()
        if (res?.status === 200) {
            users = res.users!
        }
        const res2 = await getAllOrders()
        if (res2?.status === 200) {
            orders = res2.orders!
        }
    } else {
        orders = await findOrdersByUserId(session?.user.id!)
    }

    return <>
        {
            session?.user.role === "ADMIN" ? (
                <ContextProvider orderStore={orders} userStore={users}>
                    {props.admin}
                </ContextProvider>
            ) : (
                <ContextProvider orderStore={orders} userStore={users}>
                    {props.user}
                </ContextProvider>
            )
        }
    </>
}