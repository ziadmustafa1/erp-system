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

export default function CustomerOrderForm() {
  const [customerName, setCustomerName] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [orderDate, setOrderDate] = useState('');
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

    if (!customerName || !customerNumber || !product || !quantity || !orderDate) {
      alert('All fields are required');
      return;
    }

    const orderData = { customerName, customerNumber, product, quantity: parseInt(quantity, 10), orderDate };
    console.log('Creating order:', orderData);

    try {
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Order created successfully:', result);
        setCustomerName('');
        setCustomerNumber('');
        setProduct('');
        setQuantity('');
        setOrderDate('');
        alert('تم إنشاء الطلب بنجاح');
      } else {
        const errorText = await response.text();
        console.error('Failed to create order:', errorText);
        alert('فشل في إنشاء الطلب');
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert('حدث خطأ أثناء إنشاء الطلب');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="customerName">اسم العميل</Label>
        <Input
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="customerNumber">رقم العميل</Label>
        <Input
          id="customerNumber"
          value={customerNumber}
          onChange={(e) => setCustomerNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="product">المنتج</Label>
        <Select onValueChange={setProduct} required>
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
        <Input
          id="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="orderDate">تاريخ الطلب</Label>
        <Input
          id="orderDate"
          type="date"
          value={orderDate}
          onChange={(e) => setOrderDate(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">إنشاء طلب</Button>
    </form>
  );
}
