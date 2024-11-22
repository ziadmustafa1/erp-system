// components/sales-purchases/SupplierManagement.tsx
'use client';

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import AddSupplierForm from './AddSupplierForm'; // مكون لإضافة موردين

export default function SupplierManagement() {
    const [suppliers, setSuppliers] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await fetch('/api/suppliers');
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    console.log('Received suppliers:', data); // للتحقق من البيانات

                    if (Array.isArray(data)) {
                        setSuppliers(data);
                    } else {
                        console.error('Expected an array, but received:', data);
                        setSuppliers([]);
                    }
                } else {
                    const text = await response.text();
                    console.error('Expected JSON, but received HTML:', text);
                    setSuppliers([]);
                }
            } catch (error) {
                console.error('Error fetching suppliers:', error);
                setSuppliers([]);
            }
        };

        fetchSuppliers();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/suppliers?id=${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setSuppliers(prevSuppliers => prevSuppliers.filter(supplier => supplier.id !== id));
            } else {
                throw new Error('Failed to delete supplier');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSave = () => {
        setIsAdding(false);
        // Refresh the suppliers list after save
        const fetchSuppliers = async () => {
            try {
                const response = await fetch('/api/suppliers');
                const data = await response.json();
                setSuppliers(data);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
            }
        };

        fetchSuppliers();
    };

    return (
        <div>
            <Button onClick={() => setIsAdding(true)} className="mb-4 bg-green-500 hover:bg-green-600 text-white">إضافة مورد جديد</Button>
            {isAdding && <AddSupplierForm onSave={handleSave} />}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>اسم المورد</TableHead>
                        <TableHead>المنتج</TableHead>
                        <TableHead>معلومات الاتصال</TableHead>
                        <TableHead>الإجراءات</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.isArray(suppliers) ? suppliers.map((supplier) => (
                        <TableRow key={supplier.id}>
                            <TableCell>{supplier.name}</TableCell>
                            <TableCell>{supplier.product}</TableCell>
                            <TableCell>{supplier.contact}</TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm" className="mr-2 bg-yellow-500 hover:bg-yellow-600 text-white">تعديل</Button>
                                <Button variant="outline" size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white" onClick={() => handleDelete(supplier.id)}>حذف</Button>
                            </TableCell>
                        </TableRow>
                    )) : <TableRow><TableCell colSpan="4">لا يوجد موردين</TableCell></TableRow>}
                </TableBody>
            </Table>
        </div>
    );
}
