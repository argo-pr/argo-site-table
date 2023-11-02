import Link from 'next/link'
import {Button} from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className={"flex flex-col items-center justify-center text-center h-screen mt-[-200px]"}>
            <h1 className={"text-6xl font-bold"}>404</h1>
            <h2 className={"text-2xl font-bold "}>Страница не найдена</h2>
            <p>Похоже что вы попали на несуществующую страницу</p>
            <Button asChild className={"mt-4"}>
                <Link href="/">Вернутся на главную </Link>
            </Button>
        </div>
    )
}