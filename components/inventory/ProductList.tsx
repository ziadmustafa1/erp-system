'use client';

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import io from 'socket.io-client';

export default function ProductList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const productsPerPage = 10;
    const totalPages = Math.ceil(products.length / productsPerPage);

    const currentProducts = products.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();
                console.log('Received products:', data); // للتحقق من البيانات

                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error('Expected an array, but received:', data);
                    setProducts([]);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]);
            }
        };

        fetchProducts();

        const socket = io();

        const connectSocket = async () => {
            await fetch('/api/inventory-socket');
            socket.on('inventory-updated', (data) => {
                setProducts(prevProducts => {
                    const updatedProducts = [...prevProducts];
                    const index = updatedProducts.findIndex(p => p.id === data.id);
                    if (index !== -1) {
                        updatedProducts[index] = { ...updatedProducts[index], ...data };
                    }
                    return updatedProducts;
                });
            });
        };

        connectSocket();

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="container mx-auto p-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>اسم المنتج</TableHead>
                        <TableHead>السعر</TableHead>
                        <TableHead>الكمية</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentProducts.map(product => (
                        <TableRow key={product.id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-between mt-4">
                <Button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                    <ChevronLeft /> السابق
                </Button>
                <span>{currentPage} من {totalPages}</span>
                <Button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                    التالي <ChevronRight />
                </Button>
            </div>
        </div>
    );
}
