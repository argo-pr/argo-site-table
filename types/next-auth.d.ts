import {UserType} from "./custom-types"

declare module "next-auth/jwt" {
    interface JWT {
        user: UserType
    }
}
declare module "next-auth" {
    interface Session {
        user: UserType
    }
}
