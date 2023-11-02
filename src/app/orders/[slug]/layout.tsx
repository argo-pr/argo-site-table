import {ReactNode} from "react";

export default async function SlugOrdersLayout({children, params}: {
    children: ReactNode,
    params: { slug: string[], order: Uint8Array }
}) {
    return <>{children}</>
}