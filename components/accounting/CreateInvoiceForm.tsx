/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';

export default function CreateInvoiceForm() {
    const [customer, setCustomer] = useState('');
    const [amount, setAmount] = useState<number | null>(null);
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('/api/invoices/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ customer, amount: parseFloat(amount as any), status }),
            });

            if (response.ok) {
                toast({
                    title: 'تم إنشاء الفاتورة بنجاح',
                    description: 'تم إضافة الفاتورة بنجاح إلى النظام.',
                });
                // Clear the form
                setCustomer('');
                setAmount(null);
                setStatus('');
            } else {
                const errorData = await response.json();
                console.error('Error creating invoice:', errorData);
                toast({
                    title: 'خطأ في إنشاء الفاتورة',
                    description: 'حدث خطأ أثناء إنشاء الفاتورة. حاول مرة أخرى.',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Error creating invoice:', error);
            toast({
                title: 'خطأ',
                description: 'حدث خطأ أثناء إنشاء الفاتورة.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="customer">العميل</Label>
                <Input id="customer" type="text" value={customer} onChange={(e) => setCustomer(e.target.value)} required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="amount">المبلغ</Label>
                <Input id="amount" type="number" value={amount || ''} onChange={(e) => setAmount(parseFloat(e.target.value))} required />
            </div>
            <div className="space-y-2">
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
            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'جاري إضافة الفاتورة...' : 'إضافة فاتورة'}
            </Button>
        </form>
    );
}
