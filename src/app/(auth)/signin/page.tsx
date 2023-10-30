"use client"

import {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {Eye, EyeOff, Loader2} from "lucide-react"
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
export default function SignIn() {
    const [loading, setLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const router = useRouter()

    const {
        clearErrors,
        setError,
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<Inputs>()

    const watchPassword = watch("password")
    const watchUsername = watch("username")

    useEffect(() => {
        clearErrors()
    }, [watchPassword, watchUsername])

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true)
        const response = await signIn("credentials", {
            username: data.username,
            password: data.password,
            redirect: false,
        })

        if (response?.status === 401) {
            setLoading(false)
            setError("validate", {message: "Логин или пароль неверны!"})
        } else {
            router.refresh()
        }
    }

    return (
        <Card className={"mx-auto mt-12 w-[360px] py-6"}>
            <CardHeader>
                <CardTitle className={"mx-auto"}>Авторизация</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={"flex flex-col gap-2"}>
                    <div className={"flex flex-col  space-y-3"}>
                        <Label htmlFor="username">Логин</Label>
                        <Input
                            placeholder={"Введите логин"}
                            id={"username"}
                            {...register("username", {required: true})}
                        />
                        <Label htmlFor="password">Пароль</Label>
                        <div className={"flex flex-row"}>
                            <Input
                                placeholder={"Введите пароль"}
                                id={"password"}
                                autoComplete={"current-password"}
                                type={showPassword ? "text" : "password"}
                                {...register("password", {required: true})}
                            />
                            <Button
                                className={"border-none ml-[-40px]"}
                                size={"icon"}
                                variant={"ghost"}
                                type={"button"}
                                onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                            </Button>
                        </div>


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
                    </div>

                    <Button
                        disabled={loading}
                        type="submit"
                        variant={"default"}
                        className={"mx-auto mt-4 w-[75%]"}>
                        {loading ? <Loader2 className={"animate-spin"}/> : "Войти"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
