import {PDFDocument, StandardFonts, rgb} from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit';
import {Order} from "@prisma/client";
import {drawTable} from "pdf-lib-draw-table-beta";


const generatePDF = async (params: {
    order: Pick<Order, "serial_number" | "article" | "warranty_period" | "production_date" | "equipment">
    url: string
}) => {

// Embed the Times Roman font
    const ubuntuFontBytes = await fetch(
        params.url + '/arial.ttf',
    ).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.create();
    const tableData = [
        ['Name', 'Age', 'City'],
        ['Alice', '24', 'New York'],
        ['Bob', '30', 'San Francisco'],
        ['Charlie', '22', 'Los Angeles'],
    ];

    // Set the starting X and Y coordinates for the table
    const startX = 50;
    const startY = 750;

    // Set the table options
    const options = {
        header: {
            hasHeaderRow: true,
            backgroundColor: rgb(0.9, 0.9, 0.9),
        },
    };

    pdfDoc.registerFontkit(fontkit);

    const ubuntuFont = await pdfDoc.embedFont(ubuntuFontBytes);
    const page = pdfDoc.addPage()
    const tableDimensions = await drawTable(pdfDoc, page, tableData, startX, startY, options);
// Get the width and height of the page
    const {width, height} = page.getSize()

// Draw a string of text toward the top of the page
    const fontSize = 30
    page.drawText('РУ-PDF', {x: 60, y: 500, size: 40, font: ubuntuFont});

// Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save({})
    return pdfBytes
}


export default generatePDF