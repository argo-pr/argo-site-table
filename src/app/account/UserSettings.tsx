"use client";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Session} from "next-auth";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {Label} from "@/components/ui/label";
import {Eye, EyeOff, Loader2} from "lucide-react";

export default function UserSettings({session}: { session: Session }) {
    const [isOldPasswordShown, setIsOldPasswordShown] = useState<boolean>(false)
    const [isNewPasswordShown, setIsNewPasswordShown] = useState<boolean>(false)
    const [isNew2PasswordShown, setIsNew2PasswordShown] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    type Inputs = {
        old_password: string;
        new_password: string;
        new_password_confirm: string;
    }
    const {
        clearErrors,
        setError,
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<Inputs>()

    const watchOldPassword = watch("old_password")
    const watchNewPassword = watch("new_password")
    const watchNewPasswordConfirm = watch("new_password_confirm")

    useEffect(() => {
        console.log(watchNewPasswordConfirm)
        if (watchOldPassword !== watchNewPasswordConfirm) {
            setError("new_password", {message: "Пароли не совпадают!"})
        } else {
            clearErrors("new_password")
        }
    }, [watchNewPassword, watchNewPasswordConfirm])
    const onSubmit: SubmitHandler<Inputs> = async (data) => {

    }
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Смена пароля</CardTitle>
                    <CardDescription>
                        Тут вы можете изменить свой пароль, для этого вы должны ввести старый и новый пароль
                    </CardDescription>
                    <CardContent className={"p-0 md:p-6 "}>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className={"md:w-3/5 flex w-full flex-col"}
                        >
                            <Label htmlFor="password" className={"py-3"}>Введите старый пароль</Label>
                            <div className={"flex flex-row"}>
                                <Input
                                    type={isOldPasswordShown ? "text" : "password"}
                                    placeholder="Старый пароль"
                                    {...register("old_password", {required: true})}
                                />
                                <Button
                                    className={"border-none ml-[-40px]"}
                                    size={"icon"}
                                    variant={"ghost"}
                                    type={"button"}
                                    onClick={() => setIsOldPasswordShown(!isOldPasswordShown)}>
                                    {isOldPasswordShown ? <EyeOff size={20}/> : <Eye size={20}/>}
                                </Button>
                            </div>

                            <Label htmlFor="new_password" className={"py-3"}>Введите новый пароль</Label>
                            <div className={"flex flex-row"}>
                                <Input
                                    type={isNewPasswordShown ? "text" : "password"}
                                    placeholder="Новый пароль"
                                    {...register("new_password", {required: true})}/>
                                <Button
                                    className={"border-none ml-[-40px]"}
                                    size={"icon"}
                                    variant={"ghost"}
                                    type={"button"}
                                    onClick={() => setIsNewPasswordShown(!isNewPasswordShown)}>
                                    {isNewPasswordShown ? <EyeOff size={20}/> : <Eye size={20}/>}
                                </Button>
                            </div>
                            <Label htmlFor="new_password_confirm" className={"py-3"}>Подтвердите новый пароль</Label>
                            <div className={"flex flex-row"}>
                                <Input
                                    type={isNew2PasswordShown ? "text" : "password"}
                                    placeholder="Подтвердите новый пароль" {...register("new_password_confirm", {required: true})}/>
                                <Button
                                    className={"border-none ml-[-40px]"}
                                    size={"icon"}
                                    variant={"ghost"}
                                    type={"button"}
                                    onClick={() => setIsNew2PasswordShown(!isNew2PasswordShown)}>
                                    {isNew2PasswordShown ? <EyeOff size={20}/> : <Eye size={20}/>}
                                </Button>
                            </div>
                            {errors.old_password && (
                                <span className={"mx-auto text-red-700"}>
                                    {errors.old_password.message}
                                </span>
                            )}
                            {errors.new_password && (
                                <span className={"mx-auto text-red-700"}>{errors.new_password.message}</span>
                            )}
                            <Button type={"submit"} disabled={loading} className={"mt-6 w-5/6 mx-auto"}>{loading ?
                                <Loader2 className={"animate-spin"}/> : "Сменить"}</Button>
                        </form>
                    </CardContent>
                </CardHeader>
            </Card>
        </>
    );
}
