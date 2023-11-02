"use client"
import QRCode from 'qrcode'
import {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button";
import {ArrowDownToLine} from "lucide-react";
import Link from "next/link";

export default function Qrcode({url, serial_number, download}: {
    url: string,
    serial_number: string,
    download: boolean
}) {
    const [qr, setQr] = useState('')
    const GenerateQRCode = () => {
        QRCode.toDataURL(url, {
            width: 115,
            margin: 2,
        }, (err, url) => {
            if (err) return console.error(err)
            setQr(url)
        })
    }

    useEffect(() => {
        GenerateQRCode()
    }, [url])

    return (
        <>
            {qr && <>
                <img className={"mx-auto p-4"} src={qr} alt={"QR code"}/>
                {download &&
                    <Button variant={"outline"} type={"button"} asChild
                            className={"w-4/5 flex items-center justify-center mx-auto"}>
                        <Link
                            href={qr}
                            download={`QR-код SN ${serial_number}.png`}
                            className={"mt-4 mx-auto flex flex-col gap-2"}
                            target="_blank"
                        >
                            <ArrowDownToLine/>
                            Скачать QR-код
                        </Link>
                    </Button>
                }
            </>}
        </>
    )
}