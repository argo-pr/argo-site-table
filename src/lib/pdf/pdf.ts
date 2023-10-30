import {PDFDocument, StandardFonts, rgb} from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit';


const generatePDF = async () => {

// Embed the Times Roman font
    const ubuntuFontBytes = await fetch(
        'http://localhost:3000/arial.ttf',
    ).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.create();

    pdfDoc.registerFontkit(fontkit);

    const ubuntuFont = await pdfDoc.embedFont(ubuntuFontBytes);
    const page = pdfDoc.addPage()

// Get the width and height of the page
    const {width, height} = page.getSize()

// Draw a string of text toward the top of the page
    const fontSize = 30
    page.drawText('ТУТ БУДЕТ PDF КОНТЕНТ', {x: 60, y: 500, size: 40, font: ubuntuFont});

// Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save({})
    return pdfBytes
}


export default generatePDF