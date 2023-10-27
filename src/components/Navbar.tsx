import Link from "next/link"

import {getUserAuth} from "@/lib/auth/utils"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {ModeToggle} from "@/components/ui/ThemeToggle"
import {Cpu} from "lucide-react";

export default async function Navbar() {
    const {session} = await getUserAuth()
    const nameExists =
        !!session?.user.username && session?.user.username.length > 5

    if (session?.user) {
        return (
            <nav className="flex items-center justify-between py-2 transition-all duration-300">
                <h1 className="transition-hover cursor-pointer font-semibold text-2xl hover:opacity-75">
                    <Link href="/" className={"flex flex-row items-center"}>
                        <Cpu color={"rgb(185, 28, 28)"} className={"mr-1"}/>
                        <span className={"font-extrabold text-red-700"}>TECH</span>
                        pass
                    </Link>
                </h1>
                <div className="flex items-center space-x-2">
                    <ModeToggle/>
                    {session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarFallback>
                                        {nameExists
                                            ? session.user.username
                                                ?.split(" ")
                                                .map((word) => word[0].toUpperCase())
                                                .join("")
                                            : "~"}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>
                  <span className="font-semibold">
                    {nameExists ? session.user.username : "New User"}
                  </span>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <Link href="/account">
                                    <DropdownMenuItem className="cursor-pointer">
                                        Account
                                    </DropdownMenuItem>
                                </Link>
                                <Link href="/api/auth/signout">
                                    <DropdownMenuItem className="cursor-pointer">
                                        Sign out
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href="/sign-in">Sign in</Link>
                    )}
                </div>
            </nav>
        )
    } else return null
}
