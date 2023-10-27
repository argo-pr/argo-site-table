"use client"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {SquareAsterisk} from "lucide-react";
import {useState} from "react";
import {verifyUsername} from "@/app/server/user";


export default function CreateUserCard() {
    const [loading, setLoading] = useState<boolean>(false)
    const [stage, setStage] = useState<number>(0)
    const [username, setUsername] = useState<string>("")
    type Inputs = {
        username: string
    }
    const {
        setError,
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<Inputs>()

    const verifyName = async (username: string) => {
        const res = await verifyUsername(username)
        console.log(res)
        if (res?.status === 200) {
            setStage(1)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Создать пользователя</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Создание нового пользователя</DialogTitle>
                    <DialogDescription>
                        Пожалуйста, заполните поля ниже
                    </DialogDescription>
                </DialogHeader>
                <div className="">
                    {stage === 0 && (
                        <div className="flex-col flex items-start">
                            <Label htmlFor="username" className="text-right my-2">
                                Введите логин
                            </Label>
                            <div className={"flex-row flex gap-2 w-full"}>
                                <Input
                                    id="username"
                                    className="w-5/6"
                                    placeholder={"Введите логин"}
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                />
                                <Button type="button" onClick={() => verifyName(username)}>Создать</Button>
                            </div>
                        </div>
                    )}

                </div>
                <DialogFooter>

                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}