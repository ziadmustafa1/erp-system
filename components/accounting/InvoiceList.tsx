'use client';

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import InvoiceDetails from './InvoiceDetails';
import EditInvoiceForm from './EditInvoiceForm';

interface Invoice {
    id: string;
    customer: string;
    amount: number;
    status: string;
    createdAt: string;
}

export default function InvoiceList() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const invoicesPerPage = 10;
    const totalPages = Math.ceil(invoices.length / invoicesPerPage);

    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const currentInvoices = invoices.slice(
        (currentPage - 1) * invoicesPerPage,
        currentPage * invoicesPerPage
    );

    const fetchInvoices = async () => {
        try {
            const response = await fetch('/api/invoices');
            const data = await response.json();
            if (Array.isArray(data)) {
                setInvoices(data);
            } else {
                console.error('Expected an array, but received:', data);
                setInvoices([]);
            }
        } catch (error) {
            console.error('Error fetching invoices:', error);
            setInvoices([]);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    const handleView = (invoice: Invoice) => {
        setSelectedInvoice(invoice);
        setIsEditing(false);
    };

    const handleEdit = (invoice: Invoice) => {
        setSelectedInvoice(invoice);
        setIsEditing(true);
    };

    const handleSave = () => {
        setSelectedInvoice(null);
        setIsEditing(false);
        // Refresh the invoices list after save
        fetchInvoices();
    };

    const handleCancel = () => {
        setSelectedInvoice(null);
        setIsEditing(false);
    };

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>رقم الفاتورة</TableHead>
                        <TableHead>العميل</TableHead>
                        <TableHead>المبلغ</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>التاريخ</TableHead>
                        <TableHead>الإجراءات</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentInvoices.map((invoice) => (
                        <React.Fragment key={invoice.id}>
                            <TableRow>
                                <TableCell>{invoice.id}</TableCell>
                                <TableCell>{invoice.customer}</TableCell>
                                <TableCell>{invoice.amount} ريال</TableCell>
                                <TableCell>{invoice.status}</TableCell>
                                <TableCell>{new Date(invoice.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm" className="mr-2" onClick={() => handleView(invoice)}>عرض</Button>
                                    <Button variant="outline" size="sm" onClick={() => handleEdit(invoice)}>تحرير</Button>
                                </TableCell>
                            </TableRow>
                            {selectedInvoice && selectedInvoice.id === invoice.id && (
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        {isEditing ? (
                                            <EditInvoiceForm key={`edit-${invoice.id}`} invoice={selectedInvoice} onSave={handleSave} onCancel={handleCancel} fetchInvoices={fetchInvoices} />
                                        ) : (
                                            <InvoiceDetails key={`view-${invoice.id}`} invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
                                        )}
                                    </TableCell>
                                </TableRow>
                            )}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-between items-center mt-4">
                <Button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="bg-red-600 hover:bg-red-700 text-white"
                >
                    <ChevronRight className="mr-2 h-4 w-4" /> السابق
                </Button>
                <span className="text-gray-600">صفحة {currentPage} من {totalPages}</span>
                <Button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="bg-red-600 hover:bg-red-700 text-white"
                >
                    التالي <ChevronLeft className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
