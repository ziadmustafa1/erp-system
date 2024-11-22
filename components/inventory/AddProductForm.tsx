'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from '@/hooks/use-toast';

export default function AddProductForm() {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/products/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, quantity, price }),
            });

            if (response.ok) {
                const product = await response.json();
                toast({ title: 'تمت إضافة المنتج بنجاح', description: `المنتج ${product.name} تمت إضافته.` });
                setName('');
                setQuantity('');
                setPrice('');
            } else {
                const errorData = await response.json();
                toast({ title: 'خطأ', description: errorData.error, variant: 'destructive' });
            }
        } catch (error) {
            console.error('Error adding product:', error);
            toast({ title: 'خطأ', description: 'حدث خطأ أثناء إضافة المنتج', variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">اسم المنتج</Label>
                <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="quantity">الكمية</Label>
                <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="price">السعر</Label>
                <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white" disabled={isLoading}>
                {isLoading ? 'جاري الإضافة...' : 'إضافة منتج'}
            </Button>
        </form>
    );
}
