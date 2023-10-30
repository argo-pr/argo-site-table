// import generatePDF from "@/lib/pdf/pdf";
// import {NextApiResponse} from "next";
// import {NextRequest} from "next/server";
//
// async function handler(req: NextRequest, res: NextApiResponse) {
//     const download = req.nextUrl.searchParams?.get("download");
//     const pdfBytes = await generatePDF()
//     return new Response(pdfBytes, {
//         headers: {
//             'Content-Type': 'application/pdf',
//             'Content-Disposition': download ? 'attachment; filename=order.pdf' : "inline; filename=order.pdf"
//         },
//
//     });
// }
//
// export {handler as GET, handler as POST}\

import {headers} from 'next/headers'

export async function GET(request: Request) {
    const headersList = headers()
    const referer = headersList.get('referer')

    return new Response('Hello, Next.js!', {
        status: 200,
        //headers: {referer: referer},
    })
}