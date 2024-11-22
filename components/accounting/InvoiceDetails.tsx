'use client';

import { Button } from "../ui/button";

export default function InvoiceDetails({ invoice, onClose }) {
  if (!invoice) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>تفاصيل الفاتورة</h2>
        <p>رقم الفاتورة: {invoice.id}</p>
        <p>العميل: {invoice.customer}</p>
        <p>المبلغ: {invoice.amount} ريال</p>
        <p>الحالة: {invoice.status}</p>
        <p>التاريخ: {new Date(invoice.createdAt).toLocaleDateString()}</p>
        <Button onClick={onClose}>إغلاق</Button>
      </div>
    </div>
  );
}
