import {NextResponse} from "next/server"
import {getToken} from "next-auth/jwt"
import {withAuth} from "next-auth/middleware"

export default withAuth(
    async function middleware(req) {
        const token = await getToken({req})

        const isAuth = !!token
        const isAuthPage = req.nextUrl.pathname.startsWith("/signin")
        const isProtectedPage = req.nextUrl.pathname.endsWith("/create")

        if (isAuthPage) {
            if (isAuth) {
                return NextResponse.redirect(new URL("/dashboard", req.url))
            }
            return null
        }


        if (!isAuth) {
            let from = req.nextUrl.pathname
            if (req.nextUrl.search) {
                from += req.nextUrl.search
            }

            return NextResponse.redirect(
                new URL(`/signin?from=${encodeURIComponent(from)}`, req.url)
            )
        } else {
            if (req.nextUrl.pathname === "/") {
                return NextResponse.redirect(new URL("/dashboard", req.url))
            }
            if (isProtectedPage && token?.user.role !== "ADMIN") {
                return NextResponse.redirect(new URL(`/`, req.url))
            }
        }
    },
    {
        callbacks: {
            async authorized() {
                // This is a work-around for handling redirect on auth pages.
                // We return true here so that the middleware function above
                // is always called.
                return true
            },
        },
    }
)

export const config = {
    matcher: ["/dashboard/:path*", "/signin", "/orders/create", "/"],
}
