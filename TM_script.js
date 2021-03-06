// ==UserScript==
// @name         Omniva pakisildi crop
// @namespace    http://tampermonkey.net/
// @version      1.0
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
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]
        firstPage.setCropBox(35, 450, 240, 360);

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

        /*document.write(
            "<iframe id='modifiedPdf' width='100%' height='100%' src='data:application/pdf;base64, " +
            encodeURI(pdfBytes) + "'></iframe>")*/



    }
})();
