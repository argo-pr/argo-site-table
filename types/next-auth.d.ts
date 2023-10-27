import { UserSession } from "./custom-types"

declare module "next-auth/jwt" {
  interface JWT {
    user: UserSession
  }
}
declare module "next-auth" {
  interface Session {
    user: UserSession
  }
}
