"use client"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Label} from "@/components/ui/label";
import generator from "generate-password";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {CheckCircle, ClipboardList, Loader2, Repeat2, Terminal} from "lucide-react";
import {useRef, useState} from "react";
import {createNewUser, verifyUsername} from "@/app/server/user";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {useToast} from "@/components/ui/use-toast";


export default function CreateUserCard() {
    const {toast} = useToast()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [stage, setStage] = useState<number>(0)
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>(generator.generate({length: 12, numbers: true}))
    const [copy, setCopy] = useState<boolean>(false)

    const ref = useRef<HTMLPreElement>(null)


    const verifyName = async (username: string) => {
        setLoading(true)
        const res = await verifyUsername(username)
        if (res?.status === 200) {
            setLoading(false)
            setStage(1)
        } else {
            setLoading(false)
            setError(res?.message)
        }
    }

    const regeneratePassword = () => {
        setPassword(generator.generate({length: 12, numbers: true}))
    }

    const createUser = async () => {
        setLoading(true)
        const res = await createNewUser({username, password})
        if (res?.status === 200) {
            setLoading(false)
            setStage(2)
        } else {
            setLoading(false)
            setError(res?.message!)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className={"w-4/5"}>Создать</Button>
            </DialogTrigger>
            <DialogContent>
                {stage !== 2 && <DialogHeader>
                    <DialogTitle>Создание нового пользователя</DialogTitle>
                    <DialogDescription>
                        Пожалуйста, заполните поля ниже
                    </DialogDescription>
                </DialogHeader>}
                <div className="">
                    {stage === 0 && (
                        <div className="flex-col flex items-start">
                            {error && (
                                <span className={"text-red-500"}>{error}</span>
                            )}
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

                                <Button type="button"
                                        disabled={loading}
                                        onClick={() => verifyName(username)}>
                                    {loading ? <Loader2 className={"animate-spin"}/> : "Проверить"}
                                </Button>
                            </div>
                        </div>
                    )}
                    {stage === 1 && (
                        <div className="flex-col flex items-start gap-2">
                            <Label htmlFor="username" className="text-right my-2">
                                Логин
                            </Label>
                            <Input
                                readOnly
                                id="username"
                                className=""
                                defaultValue={username}
                            />
                            <Label htmlFor="username" className="text-right my-2">
                                Пароль
                            </Label>
                            <div className={"flex-row flex gap-2 w-full"}>
                                <Input
                                    id="username"
                                    className=""
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button variant={"outline"} size={"icon"}
                                        onClick={regeneratePassword}><Repeat2/></Button>
                            </div>
                            <Button className={"mt-4 w-5/6 mx-auto justify-center"}
                                    onClick={() => createUser()}>Сохранить</Button>

                        </div>
                    )}
                    {stage === 2 && (
                        <div className="flex-col flex items-start">

                            <CheckCircle className={"text-green-500 mx-auto"} size={85}/>
                            <h1 className={"text-2xl font-semibold my-4 text-center mx-auto"}>Пользователь успешно
                                создан!</h1>
                            <Alert className={"m-4 mx-auto"} color={"#fc9700"}>
                                <Terminal className="h-4 w-4"/>
                                <AlertTitle>Внимание!</AlertTitle>
                                <AlertDescription>
                                    Скопируйте пароль и сохраните его сейчас, после закрытия формы пароль будет
                                    зашифрован.
                                </AlertDescription>
                            </Alert>
                            <div className="text-center w-full flex flex-row">
                                <span className={"bg-muted w-full p-4 text-left rounded-md"} ref={ref}>
                                    Логин: {username ? username : "..."}⠀
                                    <br/>
                                    Пароль: {password}
                                </span>


                                <CopyToClipboard text={ref.current?.textContent?.replace("⠀", "\n") || ""}
                                                 onCopy={() => {
                                                     setCopy(true)
                                                 }}>
                                    <Button
                                        size={"icon"}
                                        variant={"ghost"}
                                        className={"ml-[-45px] mt-[5px]"}
                                        onClick={() => toast({
                                            variant: "default",
                                            title: "Данные успешно скопированы!",
                                        })
                                        }>
                                        <ClipboardList/>
                                    </Button>
                                </CopyToClipboard>

                            </div>
                            <Button className={"mt-4 w-5/6 mx-auto justify-center"}
                                    onClick={() => {
                                        setStage(0)
                                        setUsername("")
                                    }}>Готово</Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>

    )
}