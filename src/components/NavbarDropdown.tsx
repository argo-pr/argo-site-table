"use client"

import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import Link from "next/link";
import {Session} from "next-auth";
import {signOut} from "next-auth/react";

export default function NavbarDropdown({session, nameExists}: { session: Session, nameExists: boolean }) {
    return <DropdownMenu>
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
                    {nameExists ? session.user.username : "Пользователь"}
                </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <Link href="/account">
                <DropdownMenuItem className="cursor-pointer">
                    Аккаунт
                </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
                Выйти
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}