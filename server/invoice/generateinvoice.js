const PDFDocument = require('pdfkit');

function generateInvoicePDF(stream, order) {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    doc.pipe(stream);

    // Styling
    const primaryColor = '#000000';
    const secondaryColor = '#555555';
    const lineColor = '#e0e0e0';

    // --- Header (Company Info) ---
    doc.fontSize(10)
       .font('Helvetica-Bold')
       .text('VELAANS HP NO.1', { align: 'right' })
       .font('Helvetica')
       .text('F.NO.106', { align: 'right' })
       .text('MOOKANDAPALLY,  Sipcot-635126', { align: 'right' })
       .text(`GSTIN: 33ABCPL4146K1ZR`, { align: 'right' })
       .moveDown(2);

    // --- Invoice Title ---
    doc.fontSize(20)
       .font('Helvetica-Bold')
       .text('INVOICE', { align: 'center' })
       .moveDown(1);

    // --- Billing & Invoice Details ---
    const column1 = 50;
    const column2 = 400;
    const column3 = 470;

    // Left Column: Billing Info
    doc.font('Helvetica-Bold')
    .fontSize(12)

       .text('BILL TO:', column1, 150);
    doc.font('Helvetica')
    .fontSize(12)

       .text(order.customerName || 'Customer Name', column1, 170);
    doc.text(order.customerEmail || 'Customer email', column1, 190)
    // Right Column: Invoice Details
    doc.font('Helvetica-Bold')
        .fontSize(12)
       .text('INVOICE :', column2, 150)
       .font('Helvetica')
       .fontSize(12)
       
       .text(order.invoiceNumber || 'INV-0001', column3, 150)
       .fontSize(12)

       .font('Helvetica-Bold')
       .fontSize(12)

       .text('DATE', column2, 180)
       .font('Helvetica')
       .text(new Date().toLocaleDateString(), column3, 180)
       .moveDown(2);

    // --- Items Table ---
    const tableTop = 260;
    const xItem = 20;
    const xQty = 300;
    const xPrice = 350;
    const xGST = 410;
    const xTotal = 450;

    // Table Header
    doc.font('Helvetica-Bold')
       .text('ITEM', xItem, tableTop)
       .text('QTY', xQty, tableTop)
       .text('PRICE', xPrice, tableTop)
         .text('GST', xGST , tableTop)
       .text('AMOUNT', xTotal, tableTop);


    // Header underline
    doc.strokeColor(lineColor)
       .lineWidth(1)
       .moveTo(xItem, tableTop + 20)
       .lineTo(xTotal + 50, tableTop + 20)
       .stroke();

    // Table Rows
    let total = 0;
    let currentY = tableTop + 30;
    
    order.items.forEach((item) => {
        const itemTotal = item.quantity * (item.price + (item.price * 0.18)); // Assuming 18% GST
        const itemGST = item.price * 0.18; // Assuming 18% GST
        total += itemTotal;

        doc.font('Helvetica')
           .text(item.name, xItem, currentY)
           .text(item.quantity.toString(), xQty, currentY)
           .text(`${item.price.toFixed(2)}`, xPrice, currentY)
           .text(`${(item.price * 0.18).toFixed(2)}`, xGST, currentY) // Assuming 18% GST
           .text(`${itemTotal.toFixed(2)}`, xTotal, currentY);

        currentY += 25;
    });

    // Total Section
    doc.strokeColor(lineColor)
       .lineWidth(1)
       .moveTo(xPrice, currentY + 10)
       .lineTo(xTotal + 50, currentY + 10)
       .stroke();

    doc.font('Helvetica-Bold')
       .text('TOTAL', xPrice, currentY + 20)
       
       .text(`${total.toFixed(2)}`, xTotal, currentY + 20);

    doc.end();
}

module.exports = generateInvoicePDF;