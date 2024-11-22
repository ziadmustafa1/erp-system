'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CancelOrder({ orderId, onCancel }) {
    const [reason, setReason] = useState('');

    const handleCancel = async () => {
        try {
            const response = await fetch('/api/orders/cancel', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: orderId, reason }),
            });

            if (response.ok) {
                alert('تم إلغاء الطلب بنجاح');
                onCancel();
            } else {
                const result = await response.json();
                console.error('Failed to cancel order:', result);
                alert('حدث خطأ أثناء إلغاء الطلب');
            }
        } catch (error) {
            console.error('Error cancelling order:', error);
            alert('حدث خطأ أثناء إلغاء الطلب');
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="reason">سبب الإلغاء</Label>
                <Textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                />
            </div>
            <Button onClick={handleCancel} className="w-full bg-red-500 hover:bg-red-600 text-white">إلغاء الطلب</Button>
        </div>
    );
}
