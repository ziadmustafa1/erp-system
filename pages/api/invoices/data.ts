// pages/api/invoices/data.ts

export interface Invoice {
    id: string;
    customer: string;
    amount: number;
    status: string;
    createdAt: string;
}

export let invoices: Invoice[] = [
    { id: '1', customer: 'عميل 1', amount: 100, status: 'مدفوعة', createdAt: new Date().toISOString() },
    { id: '2', customer: 'عميل 2', amount: 200, status: 'معلقة', createdAt: new Date().toISOString() }
];

export const addInvoice = (invoice: Invoice) => {
    invoices.push(invoice);
};

export const updateInvoice = (id: string, updatedInvoice: Partial<Invoice>) => {
    invoices = invoices.map(invoice => 
        invoice.id === id ? { ...invoice, ...updatedInvoice } : invoice
    );
};
