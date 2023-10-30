import {db} from "@/lib/db"

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

const isUserHasCurrentOrder = async (userId: string, orderId: string) => {
    const order = await db.order.findUnique({
        where: {
            id: orderId,
        },
    })
    return order
}

export {findOrdersByUserId, isUserHasCurrentOrder}