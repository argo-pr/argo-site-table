"use client";
import {FilePlus, UserPlus} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import CreateUserCard from "@/components/CreateUserCard";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {UsersTable} from "@/components/UsersTable";
import {OrdersTable} from "@/components/OrdersTable";
import {ContextStore} from "@/app/dashboard/ContextStore";
import {useContext} from "react";

export default function AdminPage() {
    const {orderStore, userStore} = useContext(ContextStore);

    return <div>
        <h1 className={"text-3xl font-semibold p-3"}>Админ панель</h1>
        <div className={"flex flex-col sm:items-start items-center sm:flex-row w-full gap-2"}>
            <div className={"flex md:flex-col flex-col sm:flex-row gap-2"}>
                <Card className="flex flex-col w-full md:w-60 h-auto">
                    <CardHeader className={"py-4 mx-auto"}>
                        <CardTitle className={"text-xl mx-auto text-center flex flex-row items-center"}>
                            <FilePlus size={30} className={"mr-2"}/>
                            Создать заказ
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
                        <CardTitle className={"text-xl mx-auto text-center flex flex-row items-center"}>
                            <UserPlus size={35} className={"mr-2"}/>
                            Создать пользователя
                        </CardTitle>
                    </CardHeader>
                    <CardContent className={"flex flex-col justify-center items-center"}>
                        <Button variant={"outline"} className={"w-4/5 mt-6"} asChild>
                            <CreateUserCard/>
                        </Button>
                    </CardContent>
                </Card>
            </div>
            <Card className={"w-full p-4"}>
                <Tabs defaultValue="orders" className="w-full">
                    <TabsList className={"w-full"}>
                        <TabsTrigger value="orders">Заказы</TabsTrigger>
                        <TabsTrigger value="users">Пользователи</TabsTrigger>
                    </TabsList>
                    <TabsContent value="orders" className={"p-3"}>
                        <h1>Заказы</h1>
                        <OrdersTable data={orderStore} type={"admin"}/>
                    </TabsContent>
                    <TabsContent value="users" className={"p-3"}>
                        <h1>Пользователи</h1>
                        <UsersTable data={userStore}/>
                    </TabsContent>
                </Tabs>
            </Card>
        </div>
    </div>
}