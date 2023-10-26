import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { DefaultSession, NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { env } from "@/lib/env.mjs"


declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user }) => {
      session.user.id = user.id;
      return session;
    },
  },
  providers: [
     
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
