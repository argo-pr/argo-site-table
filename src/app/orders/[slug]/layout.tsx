import {getUserAuth} from "@/lib/auth/utils";
import {redirect} from "next/navigation";
import {isUserHasCurrentOrder} from "@/app/server/order";
import {Order, User} from "@prisma/client";
import generatePDF from "@/lib/pdf/pdf";

export default async function SlugOrdersLayout({children, params}: {
    children: React.ReactNode,
    params: { slug: string[], order: Uint8Array }
}) {
    return <>{children}</>
}