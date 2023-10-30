import generatePDF from "@/lib/pdf/pdf";
import {NextApiResponse} from "next";
import {NextRequest} from "next/server";

async function handler(req: NextRequest, res: NextApiResponse) {
    const download = req.nextUrl.searchParams?.get("download");
    const pdfBytes = await generatePDF()
    return new Response(pdfBytes, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': download ? 'attachment; filename=order.pdf' : "inline; filename=order.pdf"
        },

    });
}

export {handler as GET}

