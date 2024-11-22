'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type AccountingEntry = {
    id: number
    date: string
    customer: string
    amount: number
    status: string
}

export default function AccountingReport() {
    const [entries, setEntries] = useState<AccountingEntry[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAccountingData = async () => {
            const response = await fetch('/api/reports/accounting');
            const data: AccountingEntry[] = await response.json();
            setEntries(data);
            setLoading(false);
        }

        fetchAccountingData();
    }, [])

    if (loading) {
        return <div>جاري تحميل البيانات...</div>
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>التاريخ</TableHead>
                    <TableHead>الوصف</TableHead>
                    <TableHead>المبلغ</TableHead>
                    <TableHead>الحالة</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {entries.map((entry) => (
                    <TableRow key={entry.id}>
                        <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                        <TableCell>{entry.customer}</TableCell>
                        <TableCell>{entry.amount.toFixed(2)}</TableCell>
                        <TableCell>{entry.status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
