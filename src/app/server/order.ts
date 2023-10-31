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

export {findOrdersByUserId, findOrderBySerialNumber}