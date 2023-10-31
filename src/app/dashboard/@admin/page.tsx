"use client";
import {FilePlus, UserPlus} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import CreateUserCard from "@/components/CreateUserCard";
import {runInConsole} from "@/lib/DatabaseDump";

export default function AdminPage() {
    return <div>
        <h1 className={"text-3xl font-semibold p-3"}>Админ панель</h1>
        <div className={"flex flex-row w-full gap-2"}>
            <div className={"flex flex-col gap-2"}>
                <Card className="flex flex-col w-60 h-auto">
                    <CardHeader className={"py-4 mx-auto"}>
                        <CardTitle>
                            <h1 className={"text-xl mx-auto text-center flex flex-row items-center"}>
                                <FilePlus size={30} className={"mr-2"}/>
                                Создать заказ
                            </h1>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className={"flex flex-col justify-center items-center"}>
                        <Button variant={"outline"} className={"w-4/5 mt-6"} asChild>
                            <Link href={"/orders/create"}>
                                Создать
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card className="flex flex-col w-60 h-auto">
                    <CardHeader className={"py-4 mx-auto"}>
                        <CardTitle>
                            <h1 className={"text-xl mx-auto text-center flex flex-row items-center"}>
                                <UserPlus size={35} className={"mr-2"}/>
                                Создать пользователя
                            </h1>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className={"flex flex-col justify-center items-center"}>
                        <Button variant={"outline"} className={"w-4/5 mt-6"} asChild>
                            <CreateUserCard/>
                        </Button>
                    </CardContent>
                </Card>
            </div>
            <div className={"bg-muted w-full"}>
                <h1>Dashboard</h1>
                <Button onClick={() => runInConsole()}>1</Button>
            </div>
        </div>
    </div>
}