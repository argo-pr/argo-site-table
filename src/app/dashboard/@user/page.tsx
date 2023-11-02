"use client";

import {OrdersTable} from "@/components/OrdersTable";
import {useContext} from "react";
import {ContextStore} from "@/app/dashboard/ContextStore";

export default function UserPage() {
    let {orderStore} = useContext(ContextStore);
    return <>
        <OrdersTable data={orderStore} type={"user"}/>
    </>
}