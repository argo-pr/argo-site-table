"use server"
import {Prisma, User} from ".prisma/client"

const verifyUsername = async (username: string) => {
    try {
        const response = await db?.user.findUnique({
            where: {
                username,
            },
        })

        if (response?.id) {
            return {status: 200, message: "Пользователь успешно создан."}
        }
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                return {
                    status: 403,
                    message:
                        "Пользователь с таким именем уже существует. Пожалуйста, используйте другое имя.",
                }
            }
        }
        return {status: 500, message: "Серверная ошибка"}
    }
}

export {verifyUsername}