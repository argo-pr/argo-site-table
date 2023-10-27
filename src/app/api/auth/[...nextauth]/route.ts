import {UserSession} from "@/../types/custom-types"
import {PrismaAdapter} from "@auth/prisma-adapter"
import {NextAuthOptions} from "next-auth"
import NextAuth from "next-auth/next"
import bcrypt from "bcrypt";
import CredentialProvider from "next-auth/providers/credentials"
import {db} from "@/lib/db"


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        jwt: async ({token, user}) => {
            user ? (token.user = <UserSession>user) : null
            return token
        },
        session: async ({session, token}) => {
            session.user = token.user
            return session
        },
    },
    pages: {
        signIn: "/signin",
    },
    providers: [
        CredentialProvider({
            name: "credentials",
            credentials: {
                username: {label: "Username", type: "text"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials, req) {
                const candidate = await db.user.findUnique({
                    where: {
                        username: credentials?.username,
                    },
                })
                if (candidate && bcrypt.compareSync(credentials?.password!, candidate.password)) {
                    return candidate
                }
                return null
            },
        }),
    ],
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}
