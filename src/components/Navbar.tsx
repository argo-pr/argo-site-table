// noinspection HtmlUnknownTarget

import Link from "next/link"

import {ModeToggle} from "@/components/ui/ThemeToggle"
import {Cpu} from "lucide-react";

import NavbarDropdown from "@/components/NavbarDropdown";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {Button} from "@/components/ui/button";

export default async function Navbar() {
    const session = await getServerSession(authOptions);
    const nameExists =
        !!session?.user.username && session?.user.username.length > 1

    return (
        <nav className="flex items-center justify-between py-2 transition-all duration-300">
            <h1 className="transition-hover cursor-pointer font-semibold text-2xl hover:opacity-75">
                <Link href="/" className={"flex flex-row items-center"}>
                    <Cpu color={"rgb(185, 28, 28)"} className={"mr-1"}/>
                    <span className={"font-extrabold text-red-700"}>TECH</span>
                    pass
                </Link>
            </h1>
            <div className="flex items-center space-x-2 mt-2">
                <ModeToggle/>
                {session?.user ? (
                    <NavbarDropdown nameExists={nameExists} session={session}/>
                ) : (
                    <Button asChild variant={"outline"}>
                        <Link href="/signin">Войти</Link>
                    </Button>

                )}
            </div>
        </nav>
    )

}
