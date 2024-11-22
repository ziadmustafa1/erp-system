'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddSupplierForm({ onSave }) {
    const [name, setName] = useState('');
    const [product, setProduct] = useState('');
    const [contact, setContact] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const supplierData = { name, product, contact };
        console.log('Creating supplier:', supplierData);

        try {
            const response = await fetch('/api/suppliers/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(supplierData),
            });

            if (response.ok) {
                setName('');
                setProduct('');
                setContact('');
                alert('تم إضافة المورد بنجاح');
                onSave();
            } else {
                const result = await response.json();
                console.error('Failed to create supplier:', result);
                throw new Error('فشل في إنشاء المورد');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('حدث خطأ أثناء إنشاء المورد');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">اسم المورد</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <Label htmlFor="product">المنتج</Label>
                <Input id="product" value={product} onChange={(e) => setProduct(e.target.value)} required />
            </div>
            <div>
                <Label htmlFor="contact">معلومات الاتصال</Label>
                <Input id="contact" value={contact} onChange={(e) => setContact(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">إضافة مورد</Button>
        </form>
    );
}
