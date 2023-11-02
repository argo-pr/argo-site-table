// import {PDFDocument, StandardFonts, rgb} from 'pdf-lib'
// import fontkit from '@pdf-lib/fontkit';
import {Order} from "@prisma/client";
import {jsPDF} from "jspdf";
import {Base64} from "js-base64";
import autoTable from "jspdf-autotable";
// import {drawTable} from "pdf-lib-draw-table-beta";
// import {DrawTableOptions} from "pdf-lib-draw-table-beta/types";
// import {TableOptionsDeepPartial} from "pdf-lib-draw-table-beta/build/types";


const generatePDF = async (params: {
    order: Pick<Order, "serial_number" | "article" | "warranty_period" | "production_date" | "equipment">
    url: string
}) => {

// Embed the Times Roman font
    const font = await fetch(
        params.url + '/pdf/arial.ttf',
    ).then((res) => res.arrayBuffer());
    const logo = await fetch(
        params.url + '/pdf/pdf-logo.png',
    ).then((res) => res.arrayBuffer());
    const eac_logo = await fetch(
        params.url + '/pdf/eac.png',
    ).then((res) => res.arrayBuffer());

    const doc = new jsPDF();
    doc.addFileToVFS("MyFont.ttf", Base64.fromUint8Array(new Uint8Array(font)));
    doc.addFont("MyFont.ttf", "MyFont", "normal");
    doc.setFont("MyFont");
    doc.addImage(Base64.fromUint8Array(new Uint8Array(logo)), "PNG", 15, 15, 32, 12);
    autoTable(doc, {
        theme: "plain",
        styles: {font: "MyFont"},
        margin: {top: 25},
        body: [
            ['Серийный номер:', params.order.serial_number],
            ['Артикул:', params.order.article],
            ['Срок гарантии:', params.order.warranty_period],
            ['Дата производства:', params.order.production_date],
            ['Оборудование:', params.order.equipment],
        ],
    })
    // doc.text("Паспорт устройства", 50, 200);


//     const pdfDoc = await PDFDocument.create();
//     const page = pdfDoc.addPage()
//     // Регистрируем ру шрифт
//     pdfDoc.registerFontkit(fontkit);
//     const ruFont = await pdfDoc.embedFont(font);
//
//
//     //Рисуем лого
//     const img_1 = await pdfDoc.embedPng(logo);
//     const img_1_scaled = img_1.scale(0.75);
//     page.drawImage(img_1, {
//         x: 50,
//         y: 750,
//         width: img_1_scaled.width,
//         height: img_1_scaled.height,
//     });
//
//     const img_2 = await pdfDoc.embedPng(eac_logo);
//     const img_2_scaled = img_1.scale(0.45);
//     page.drawImage(img_2, {
//         x: 460,
//         y: 750,
//         width: img_2_scaled.width,
//         height: img_2_scaled.height + 35,
//     });
//
//     const text_1 = "https://techpass.ru/";
//     const text_2 = "service@techpass.ru";
//     const text_3 = "+7 999 999-99-99";
//     page.drawText(text_1, {x: 285, y: 788, size: 11, font: ruFont});
//     page.drawText(text_2, {x: 285, y: 774, size: 11, font: ruFont});
//     page.drawText(text_3, {x: 285, y: 760, size: 11, font: ruFont});
//
//
//     const text_4 = "Паспорт устройства";
//     const text_5 = params.order.article;
//     page.drawText(text_4, {x: 50, y: 710, size: 24, font: ruFont});
//     page.drawText(text_5, {x: 50, y: 690, size: 14, font: ruFont});
//
//     const tableData = [
//         ["Серийный номер:", params.order.serial_number],
//     ]
//     // Set the starting X and Y coordinates for the table
//     const startX = 50;
//     const startY = 750;
//
//     // Set the table options
//     const options: TableOptionsDeepPartial<DrawTableOptions> | undefined = {
//         font: ruFont,
//         textSize: 14,
//         contentAlignment: "center",
//         column: {}
//
//
//     };
//
//
//     const tableDimensions = await drawTable(pdfDoc, page, tableData, startX, startY, options);
// // Get the width and height of the page
//     const {width, height} = page.getSize()
//
// // Draw a string of text toward the top of the page
//     const fontSize = 30
//
//
// // Serialize the PDFDocument to bytes (a Uint8Array)
//     const pdfBytes = await pdfDoc.save({})
    return doc.output("arraybuffer")
}


export default generatePDF