'use client';

import { Button } from "@/components/ui/button";

export default function OrderDetails({ order, onClose }) {
    if (!order) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex items-center justify-center">
            <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg border-2 border-blue-500">
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">تفاصيل الطلب</h2>
                <p className="mb-2"><strong>اسم العميل:</strong> {order.customerName}</p>
                <p className="mb-2"><strong>المنتج:</strong> {order.product}</p>
                <p className="mb-2"><strong>الكمية:</strong> {order.quantity}</p>
                <p className="mb-2"><strong>تاريخ الطلب:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                <Button onClick={onClose} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white">إغلاق</Button>
            </div>
        </div>
    );
}
