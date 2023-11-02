"use server"
import {Prisma} from ".prisma/client"
import bcrypt from "bcrypt";

const verifyUsername = async (username: string) => {
    try {
        const response = await db?.user.findUnique({
            where: {
                username,
            },
        })
        if (response === null) {
            return {status: 200, message: "Пользователь успешно создан."}
        } else {
            return {
                status: 403,
                message:
                    "Пользователь с таким именем уже существует. Пожалуйста, используйте другое имя.",
            }
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

const createNewUser = async (data: { username: string; password: string }) => {
    try {
        const response = await db?.user.create({
            data: {
                username: data.username,
                password: bcrypt.hashSync(data.password, 10),
                role: "USER",
            },
        })
        if (response) {
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

const getAllUsers = async () => {
    try {
        const response = await db?.user.findMany({
            select: {
                id: true,
                username: true,
                role: true,
            }
        })
        return {status: 200, users: response}
    } catch (e) {
        return {status: 500, message: "Серверная ошибка"}
    }

}
export {verifyUsername, createNewUser, getAllUsers}