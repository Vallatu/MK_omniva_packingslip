// ==UserScript==
// @name         Omniva pakisildi crop
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  try to take over the world!
// @author       Jürgen
// @match        https://static.maksekeskus.ee/lbl/*
// @require      https://unpkg.com/pdf-lib
// @require      https://printjs-4de6.kxcdn.com/print.min.js
// ==/UserScript==

(function() {
    'use strict';
    var url = window.location.href;
    createPdf();
    async function createPdf() {
        const arrayBuffer = await fetch(url).then(res => res.arrayBuffer());
        const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
        const [existingPage] = await pdfDoc.copyPages(pdfDoc, [0])
        pdfDoc.addPage(existingPage)
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]
        const barcode = pages[1]
        firstPage.setCropBox(35, 450, 240, 360);
        barcode.setCropBox(85, 330, 140, 210);
        const pdfBytes = await pdfDoc.saveAsBase64()
        printJS({
                printable: pdfBytes,
                type: 'pdf',
                base64: true,
                showModal: true,
                modalMessage: "Document Loading...",
                onError: (err) => console.log(err),
                fallbackPrintable: () => console.log("FallbackPrintable"),
                onPrintDialogClose: () => console.log('The print dialog was closed')
            });
    }
})();
