'use client';

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import CancelOrder from './CancelOrder';
import EditOrderForm from './EditOrderForm';
import OrderDetails from './OrderDetails';

interface Order {
    id: string;
    customerName: string;
    customerNumber: string; // إضافة خاصية customerNumber
    product: string;
    quantity: number;
    orderDate: string;
    status: string;
}

export default function OrderList() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/orders');
                const data: Order[] = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleEdit = (order: Order) => {
        setSelectedOrder(order);
        setIsEditing(true);
        setIsCancelling(false);
    };

    const handleCancel = (order: Order) => {
        setSelectedOrder(order);
        setIsCancelling(true);
        setIsEditing(false);
    };

    const handleSave = () => {
        setSelectedOrder(null);
        setIsEditing(false);
        setIsCancelling(false);
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/orders');
                const data: Order[] = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    };

    const handleClose = () => {
        setSelectedOrder(null);
        setIsEditing(false);
        setIsCancelling(false);
    };

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>اسم العميل</TableHead>
                        <TableHead>المنتج</TableHead>
                        <TableHead>الكمية</TableHead>
                        <TableHead>تاريخ الطلب</TableHead>
                        <TableHead>الإجراءات</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>{order.customerName}</TableCell>
                            <TableCell>{order.product}</TableCell>
                            <TableCell>{order.quantity}</TableCell>
                            <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(order)}>تعديل</Button>
                                <Button variant="outline" size="sm" className="mr-2" onClick={() => handleCancel(order)}>إلغاء</Button>
                                <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>تفاصيل</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {selectedOrder && isEditing && (
                <EditOrderForm
                    order={selectedOrder}
                    onSave={handleSave}
                    onCancel={handleClose}
                />
            )}
            {selectedOrder && isCancelling && (
                <CancelOrder
                    orderId={selectedOrder.id}
                    onCancel={handleSave}
                />
            )}
            {selectedOrder && !isEditing && !isCancelling && (
                <OrderDetails
                    order={selectedOrder}
                    onClose={handleClose}
                />
            )}
        </div>
    );
}
