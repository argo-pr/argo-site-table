"use client"

import React, {Suspense, useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {ArrowUpRightSquare, BookOpenText, FileText, HardDriveDownload, Loader2} from "lucide-react";
import Link from "next/link";
import {Driver} from "@prisma/client";


export default function OrdersPage({params}: { params: { slug: string, drivers: Driver } }) {
    const [url, setUrl] = useState<string>("")
    const [IsMounted, setIsMounted] = useState<boolean>(false)
    const [isDriverShowing, setIsDriverShowing] = useState<boolean>(false)

    useEffect(() => {
        const host = window.location.hostname
        const port = window.location.port
        const protocol = window.location.protocol
        setUrl(protocol + "//" + host + ":" + port + "/api/order/" + params.slug + "/")
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), 1500)
        return () => clearTimeout(timeout)
    }, [])

    return <>
        <div className={"overflow-x-hidden"}>
            {
                url !== "" && (<>
                    <div className="flex mx-auto  gap-6 flex-col justify-center m-4 sm:flex-row">
                        <Button variant={"outline"} className={"flex gap-2"} asChild>
                            <Link href={url + "?download=true"} className={"flex items-center  gap-2 "}>
                                <FileText/> Скачать PDF
                            </Link>
                        </Button>
                        <Button variant={"outline"} className={"flex gap-2"}
                                onClick={() => setIsDriverShowing(!isDriverShowing)}>
                            {!isDriverShowing ? <><HardDriveDownload/> Драйверы</> : <><BookOpenText/> Документ</>}
                        </Button>
                        <Button variant={"outline"} className={"flex gap-2 flex-row"}>
                            <Link href={url} className={"flex items-center  gap-2"} target={"_blank"}>
                                <ArrowUpRightSquare/>
                                Открыть в новой вкладке
                            </Link>
                        </Button>
                    </div>
                    {isDriverShowing ? (
                        <>
                            <h1 className={"text-3xl w-3/5 mx-auto font-semibold p-3"}>Драйверы</h1>
                            <table className={"w-3/5 mx-auto"}>
                                <tbody className={"table-auto border-separate border-spacing-y-2.5"}>
                                <tr className={"border-b border-gray-500 "}>
                                    <td className={"px-6 py-4"}>Материнская плата</td>
                                    <td className={"px-6 py-4"}>
                                        {params.drivers?.motherboard ? (
                                            <Link href={params.drivers.motherboard} className={"underline cursor-pointer"}>Скачать
                                                драйвер</Link>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                </tr>
                                <tr className={"border-b border-gray-500"}>
                                    <td className={"px-6 py-4"}>Видеокарта</td>
                                    <td className={"px-6 py-4"}>
                                        {params.drivers?.gpu ? (
                                            <Link href={params.drivers.gpu} className={"underline cursor-pointer"}>Скачать
                                                драйвер</Link>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                </tr>
                                <tr className={"border-b border-gray-500"}>
                                    <td className={"px-6 py-4"}>Чипсет</td>
                                    <td className={"px-6 py-4"}>
                                        {params.drivers?.chipset ? (
                                            <Link href={params.drivers.chipset} className={"underline cursor-pointer"}>Скачать
                                                драйвер</Link>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                </tr>
                                <tr className={"border-b border-gray-500"}>
                                    <td className={"px-6 py-4"}>Аудио</td>
                                    <td className={"px-6 py-4"}>
                                        {params.drivers?.audio ? (
                                            <Link href={params.drivers.audio} className={"underline cursor-pointer"}>Скачать
                                                драйвер</Link>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                </tr>
                                <tr className={"border-b border-gray-500"}>
                                    <td className={"px-6 py-4"}>Lan</td>
                                    <td className={"px-6 py-4"}>
                                        {params.drivers?.lan ? (
                                            <Link href={params.drivers.lan} className={"underline cursor-pointer"}>Скачать
                                                драйвер</Link>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <>
                            {!IsMounted &&
                                (<Loader2 className={"w-12 mt-12 h-12 animate-spin mx-auto"}/>)
                            }
                            <div className="mx-auto overflow-x-auto w-full h-full">
                                <Suspense fallback={<>Loading...</>}>

                                    <div className={`${IsMounted ? "" : "hidden"} w-full mx-auto`}>
                                        <object
                                            className={"mx-auto overflow-x-scroll min-w-4xl" + IsMounted ? "" : " hidden"}
                                            data={"/../../api/order/" + params.slug + "/#zoom=85&scrollbar=0&toolbar=0&navpanes=0"}
                                            type="application/pdf"
                                            width="100%"
                                            height="980"
                                        />
                                    </div>
                                </Suspense>
                            </div>
                        </>
                    )}

                </>)
            }
            {/*<embed*/}
            {/*    dangerouslySetInnerHTML={{*/}
            {/*        __html: `<p>This browser does not support PDFs. Please download the PDF to view it: <a*/}
            {/*                href={"http://localhost:3000/api/order/" + params.slug[0] + "/#zoom=75&scrollbar=1&toolbar=0&navpanes=0"}>Download*/}
            {/*                PDF</a>.</p>`*/}
            {/*    }}*/}
            {/*    src={"http://localhost:3000/api/order/" + params.slug[0] + "/#zoom=75&scrollbar=1&toolbar=0&navpanes=0"}*/}
            {/*    type="application/pdf"/>*/}

        </div>
    </>

}