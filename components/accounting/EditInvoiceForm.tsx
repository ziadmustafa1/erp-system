'use client';

import { useState } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface Invoice {
    id: string;
    customer: string;
    amount: number;
    status: string;
}

interface EditInvoiceFormProps {
    invoice: Invoice;
    onSave: () => void;
    onCancel: () => void;
    fetchInvoices: () => void;
}

export default function EditInvoiceForm({ invoice, onSave, onCancel, fetchInvoices }: EditInvoiceFormProps) {
    const [customer, setCustomer] = useState(invoice.customer);
    const [amount, setAmount] = useState(invoice.amount);
    const [status, setStatus] = useState(invoice.status);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/invoices/update?id=${invoice.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customer, amount, status }),
            });

            const result = await response.json();
            console.log('API Response:', result);

            if (response.ok) {
                fetchInvoices(); // استدعاء لتحديث القائمة بعد التعديل
                onSave();
            } else {
                console.error('Failed to update invoice:', result);
            }
        } catch (error) {
            console.error('Error updating invoice:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="customer">العميل</Label>
                <Input id="customer" value={customer} onChange={(e) => setCustomer(e.target.value)} required />
            </div>
            <div>
                <Label htmlFor="amount">المبلغ</Label>
                <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            <div>
                <Label htmlFor="status">الحالة</Label>
                <Select onValueChange={setStatus} value={status}>
                    <SelectTrigger>
                        <SelectValue placeholder="اختر حالة الفاتورة" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="مدفوعة">مدفوعة</SelectItem>
                        <SelectItem value="معلقة">معلقة</SelectItem>
                        <SelectItem value="متأخرة">متأخرة</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex space-x-2">
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">حفظ</Button>
                <Button type="button" className="bg-gray-500 hover:bg-gray-600 text-white" onClick={onCancel}>إلغاء</Button>
            </div>
        </form>
    );
}
