import {Order, User} from "@prisma/client"

type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

export type UserType = Pick<User, "id" | "username" | "role">

export type Data =
    Pick<Order, "article" | "equipment" | "production_date" | "warranty_period" | "serial_number" | "id">
    & {
    user_id?: string
}

export type IContext = Prettify<{
    userStore: UserType[]
    orderStore: Data[]
}>