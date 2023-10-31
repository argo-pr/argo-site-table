import generatePDF from "@/lib/pdf/pdf";
import {NextRequest} from "next/server";
import {findOrderBySerialNumber} from "@/app/server/order";
import {redirect} from "next/navigation";

async function handler(req: NextRequest, {params}: { params: { slug: string } }) {
    const order = await findOrderBySerialNumber(params.slug)
    if (!order) {
        return redirect("/404")
    }
    const download = req.nextUrl.searchParams?.get("download");
    const pdfBytes = await generatePDF({order: order, url: req.nextUrl.origin})
    const filename = encodeURIComponent(`Паспорт устройства SN ${order.serial_number.toUpperCase()}.pdf`)
    const contentDisposition = `${download ? "attachment" : "inline"}; filename=${filename}`
    return new Response(pdfBytes, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': contentDisposition,
        },
    });
}

export {handler as GET}

