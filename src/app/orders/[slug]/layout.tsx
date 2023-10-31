export default async function SlugOrdersLayout({children, params}: {
    children: React.ReactNode,
    params: { slug: string[], order: Uint8Array }
}) {
    return <>{children}</>
}