"use client"
import {ContextStore} from "@/app/dashboard/ContextStore";
import {IContext} from "../../../types/custom-types";
import {ReactNode} from "react";

export default function ContextProvider({children, userStore, orderStore}: {
    children: ReactNode,
    userStore: IContext["userStore"],
    orderStore: IContext["orderStore"]
}) {
    return <ContextStore.Provider value={
        {
            userStore,
            orderStore,
        }
    }>
        {children}
    </ContextStore.Provider>
}
