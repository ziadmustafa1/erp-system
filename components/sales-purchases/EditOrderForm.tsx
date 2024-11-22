'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface Order {
    id: string;
    customerName: string;
    customerNumber: string;
    product: string;
    quantity: number;
    orderDate: string;
    status: string;
}

interface EditOrderFormProps {
    order: Order;
    onSave: () => void;
    onCancel: () => void;
}

export default function EditOrderForm({ order, onSave, onCancel }: EditOrderFormProps) {
    const [customerName, setCustomerName] = useState(order.customerName);
    const [customerNumber, setCustomerNumber] = useState(order.customerNumber);
    const [product, setProduct] = useState(order.product);
    const [quantity, setQuantity] = useState(order.quantity.toString());
    const [orderDate, setOrderDate] = useState(order.orderDate.split('T')[0]);
    const [status, setStatus] = useState(order.status);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/orders/update`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: order.id,
                    customerName,
                    customerNumber,
                    product,
                    quantity: parseInt(quantity, 10),
                    orderDate,
                    status
                }),
            });

            const result = await response.json();
            console.log('API Response:', result);

            if (response.ok) {
                onSave();
            } else {
                console.error('Failed to update order:', result);
            }
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex items-center justify-center">
            <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg border-2 border-blue-500">
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">تعديل الطلب</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="customerName">اسم العميل</Label>
                        <Input id="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="customerNumber">رقم العميل</Label>
                        <Input id="customerNumber" value={customerNumber} onChange={(e) => setCustomerNumber(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="product">المنتج</Label>
                        <Select onValueChange={setProduct} value={product} required>
                            <SelectTrigger>
                                <SelectValue placeholder="اختر المنتج" />
                            </SelectTrigger>
                            <SelectContent>
                                {products.map((prod) => (
                                    <SelectItem key={prod.id} value={prod.name}>{prod.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="quantity">الكمية</Label>
                        <Input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="orderDate">تاريخ الطلب</Label>
                        <Input id="orderDate" type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="status">حالة الطلب</Label>
                        <Input id="status" value={status} onChange={(e) => setStatus(e.target.value)} required />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">حفظ</Button>
                        <Button type="button" className="bg-gray-500 hover:bg-gray-600 text-white" onClick={onCancel}>إلغاء</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
