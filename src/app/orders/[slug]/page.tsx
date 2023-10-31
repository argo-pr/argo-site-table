"use client"

import React, {DetailedHTMLProps, ObjectHTMLAttributes, Suspense, useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {ArrowUpRightSquare, FileText, Loader2} from "lucide-react";
import Link from "next/link";


export default function OrdersPage({params}: { params: { slug: string } }) {
    const [url, setUrl] = useState("")
    const [IsMounted, setIsMounted] = useState(false)

    useEffect(() => {
        const host = window.location.hostname
        const port = window.location.port
        const protocol = window.location.protocol
        setUrl(protocol + "//" + host + ":" + port + "/api/order/" + params.slug + "/")
    }, [])


    const mounted: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
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
                        <Button variant={"outline"} className={"flex gap-2 flex-row"}>
                            <Link href={url} className={"flex items-center  gap-2"} target={"_blank"}>
                                <ArrowUpRightSquare/>
                                Открыть в новой вкладке
                            </Link>
                        </Button>
                    </div>
                    {!IsMounted &&
                        <Loader2 className={"w-12 mt-12 h-12 animate-spin mx-auto"}/>
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