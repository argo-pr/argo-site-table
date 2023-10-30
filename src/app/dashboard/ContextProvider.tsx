"use client"
import {UserContext} from "@/app/dashboard/userContext";

export default function ContextProvider({children, data}: { children: React.ReactNode, data: any[] }) {
    return <UserContext.Provider value={data}>
        {children}
    </UserContext.Provider>
}
