import PDFDocument from 'pdfkit'

export async function generateInvoicePDF(invoice: any): Promise<Buffer> {
  return new Promise((resolve) => {
    const doc = new PDFDocument()
    let buffers: Buffer[] = []
    doc.on('data', buffers.push.bind(buffers))
    doc.on('end', () => {
      let pdfData = Buffer.concat(buffers)
      resolve(pdfData)
    })

    // Add content to the PDF
    doc.fontSize(25).text('فاتورة', 100, 80)
    doc.fontSize(15).text(`رقم الفاتورة: ${invoice.id}`, 100, 120)
    doc.text(`العميل: ${invoice.customer}`, 100, 140)
    doc.text(`المبلغ: ${invoice.amount} ريال`, 100, 160)
    doc.text(`الحالة: ${invoice.status}`, 100, 180)
    doc.text(`التاريخ: ${new Date().toLocaleDateString('ar-SA')}`, 100, 200)

    doc.end()
  })
}

