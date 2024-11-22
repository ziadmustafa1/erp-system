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

interface AccountingReportProps {
    data?: AccountingEntry[];
}

export default function AccountingReport({ data }: AccountingReportProps) {
    const [entries, setEntries] = useState<AccountingEntry[]>([])

    useEffect(() => {
        if (data) {
            setEntries(data);
        }
    }, [data])

    if (!data) {
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

