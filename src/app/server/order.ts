"use server"
import {db} from "@/lib/db"
import {Order} from "@prisma/client";
import {Prisma} from ".prisma/client";

const findOrdersByUserId = async (userId: string) => {
    return await db.order.findMany({
        where: {
            user_id: userId,
        },
        select: {
            id: true,
            serial_number: true,
            article: true,
            equipment: true,
            production_date: true,
            warranty_period: true,
        }
    })
}

const findOrderBySerialNumber = async (serialNumber: string) => {
    return await db.order.findUnique({
        where: {
            serial_number: serialNumber,
        },
        select: {
            id: true,
            serial_number: true,
            article: true,
            equipment: true,
            production_date: true,
            warranty_period: true,
        }
    })
}

const getAllOrders = async () => {
    try {
        const response = await db.order.findMany({
            select: {
                id: true,
                serial_number: true,
                article: true,
                equipment: true,
                production_date: true,
                warranty_period: true,
                user_id: true,
            }
        })
        return {status: 200, orders: response}
    } catch (e) {
        return {status: 500, message: "Серверная ошибка"}
    }
}

const createNewOrder = async (order: Pick<Order, "article" | "serial_number" | "warranty_period" | "production_date" | "equipment"> & {
    username?: string
}) => {
    try {
        const user_id = await db.user.findUnique({
            where: {
                username: order.username
            },
        })
        if (!user_id) {
            return {status: 404, message: "Пользователь не найден"}
        }
        delete order.username
        const new_order = await db.order.create({
            data: {
                user_id: user_id.id,
                ...order
            },
        })

        if (new_order) {
            return {status: 200, message: "Заказ создан", order: new_order}
        }
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(e.code);
            if (e.code === "P2002") {
                return {
                    status: 403,
                    message:
                        "Такой серийный номер уже существует. Пожалуйста, используйте другой.",
                }
            }
        }
        return {status: 500, message: "Серверная ошибка"}
    }
}

export {findOrdersByUserId, findOrderBySerialNumber, createNewOrder, getAllOrders}