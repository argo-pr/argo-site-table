"use client"

import React, {Suspense, useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {ArrowUpRightSquare, FileText} from "lucide-react";
import Link from "next/link";


export default function OrdersPage({params}: { params: { slug: string, order: Uint8Array } }) {
    const [url, setUrl] = useState("")

    useEffect(() => {
        const host = window.location.hostname
        const port = window.location.port
        const protocol = window.location.protocol
        setUrl(protocol + "//" + host + ":" + port + "/api/order/" + params.slug + "/")
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
                    <div className="mx-auto overflow-x-auto w-full h-full">
                        <Suspense fallback={<>Loadinf...</>}>
                            <object
                                className={"mx-auto overflow-x-scroll min-w-4xl"}
                                data={"/../../api/order/" + params.slug + "/#zoom=85&scrollbar=0&toolbar=0&navpanes=0"}
                                type="application/pdf"
                                width="75%"
                                height="980px"
                            />
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