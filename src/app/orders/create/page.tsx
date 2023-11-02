"use client";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {SubmitHandler, useForm} from "react-hook-form";
import {Order} from "@prisma/client";
import {useEffect, useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {createNewOrder} from "@/app/server/order";
import {Loader2, PackageCheck,} from "lucide-react";
import Qrcode from "@/components/QRcode";
import Link from "next/link";

type IOrder = Pick<Order, "serial_number" | "article" | "warranty_period" | "production_date" | "equipment"> & {
    username: string
}
export default function CreateOrderPage() {
    const [loading, setLoading] = useState<boolean>(false)
    const [stage, setStage] = useState<number>(0)
    const [isServerError, setIsServerError] = useState<string>("")
    const [data, setData] = useState<Order>()
    const [url, setUrl] = useState("")

    useEffect(() => {
        setUrl(window.location.origin)
    }, [])
    const onSubmit: SubmitHandler<IOrder> = async (data) => {
        setLoading(true)
        const response = await createNewOrder(data)
        if (response) {
            setLoading(false)
            if (response.status !== 200) {
                response.status === 403 && setError("serial_number", {message: response.message})
                response.status === 404 && setError("username", {message: response.message})
                response.status === 505 && setIsServerError(response.message)
            } else {
                setData(response.order)
                setStage(1)
            }
        }
    }
    const {
        clearErrors,
        setError,
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<IOrder>()
    return <>
        <Card>
            <CardHeader>
                <CardTitle>Создание заказа</CardTitle>
            </CardHeader>
            <CardContent>
                {stage === 0 &&
                    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-3"}>
                        <Label htmlFor={"serial_number"}>Серийный номер</Label>
                        <Input
                            id="serial_number"
                            placeholder="Серийный номер"
                            {...register("serial_number", {required: true})}/>
                        <Label htmlFor={"article"}>Артикул</Label>
                        <Input
                            id="article"
                            placeholder="Артикул"
                            {...register("article", {required: true})}/>
                        <Label htmlFor={"warranty_period"}>Срок гарантии</Label>
                        <Input
                            id="warranty_period"
                            placeholder="Срок гарантии"
                            {...register("warranty_period", {required: true})}/>
                        <Label htmlFor={"production_date"}>Дата производства</Label>
                        <Input
                            id="production_date"
                            placeholder="Дата производства"
                            {...register("production_date", {required: true})}/>
                        <Label htmlFor={"equipment"}>Оборудование</Label>
                        <Input
                            id="equipment"
                            placeholder="Оборудование"
                            {...register("equipment", {required: true})}/>
                        <Label htmlFor={"username"}>Логин пользователя</Label>
                        <Input
                            id="username"
                            placeholder="Логин пользователя"
                            {...register("username", {required: true})}/>
                        {errors.username &&
                            <p className={"text-red-500 mx-auto text-center"}>{errors.username.message}</p>}
                        {errors.serial_number &&
                            <p className={"text-red-500 mx-auto text-center"}>{errors.serial_number.message}</p>}
                        {isServerError !== "" && <p className={"text-red-500 mx-auto text-center"}>{isServerError}</p>}
                        <Button type="submit" className={"w-3/5 mx-auto mt-4"} disabled={loading}>
                            {loading ? <Loader2/> : "Создать"}
                        </Button>
                    </form>
                }
                {stage === 1 && <div>
                    <PackageCheck color={"green"} className={"mx-auto"} size={64} strokeWidth={2}/>
                    <h1 className={"text-center mx-auto text-2xl"}>Заказ создан</h1>
                    <h1 className={"text-center mx-auto text-xl"}>Серийный номер: {data?.serial_number}</h1>
                    <p className={"text-center mx-auto text-md"}>
                        Заказ доступен по ссылке:
                        <Link className={"underline mx-auto"}
                              href={url + "/orders/" + data?.serial_number}>{data?.serial_number}</Link>
                    </p>

                    <Qrcode
                        url={url + "/orders/" + data?.serial_number}
                        download={true}
                        serial_number={data?.serial_number!}/>
                </div>}
            </CardContent>
        </Card>

    </>
}