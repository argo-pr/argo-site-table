"use client"

import {useState} from "react"
import {redirect, useRouter} from "next/navigation"
import {Loader2} from "lucide-react"
import {signIn} from "next-auth/react"
import {SubmitHandler, useForm} from "react-hook-form"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"

type Inputs = {
    username: string
    password: string
    validate?: boolean
}
export default function Page() {
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const {
        setError,
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true)
        const response = await signIn("credentials", {
            username: data.username,
            password: data.password,
            redirect: false,
        })

        if (response?.status === 401) {
            setLoading(false)
            setError("validate", {message: "Логин или пароль неверны"})
        } else {
            router.replace("/")
        }
    }

    return (
        <Card className={"mx-auto mt-12 w-[360px] py-6"}>
            <CardHeader>
                <CardTitle>Авторизация</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={"flex flex-col space-y-4"}>
                    <Label htmlFor="username">Логин</Label>
                    <Input
                        placeholder={"Введите логин"}
                        id={"username"}
                        {...register("username", {required: true})}
                    />
                    <Label htmlFor="password">Пароль</Label>
                    <Input
                        placeholder={"Введите пароль"}
                        id={"password"}
                        type={"password"}
                        {...register("password", {required: true})}
                    />

                    {(errors.password || errors.username) && (
                        <span className={"mx-auto text-red-700"}>
              Вы пропустили обязательное поле
            </span>
                    )}
                    {errors.validate && (
                        <span className={"mx-auto text-red-700"}>
              {errors.validate.message}
            </span>
                    )}
                    <Button
                        disabled={loading}
                        type="submit"
                        variant={"default"}
                        className={"mx-auto mt-8 w-[75%]"}>
                        {loading ? <Loader2 className={"animate-spin"}/> : "Войти"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
