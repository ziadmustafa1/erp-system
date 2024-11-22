/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { addMonths } from "date-fns";
import { DateRange } from "react-day-picker";
import DatePickerWithRange from '../ui/DateRangePicker';

interface ReportFilterProps {
    setReportData: (data: ReportData) => void;
}

interface ReportData {
    reportType: string;
    data: any;
}

export default function ReportFilter({ setReportData }: ReportFilterProps) {
    const [reportType, setReportType] = useState<string>('');
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(),
        to: addMonths(new Date(), 1),
    });

    const handleFilter = async () => {
        let endpoint = '';
        switch (reportType) {
            case 'performance':
                endpoint = '/api/reports/performance';
                break;
            case 'inventory':
                endpoint = '/api/reports/inventory';
                break;
            case 'sales':
                endpoint = '/api/reports/sales';
                break;
            case 'accounting':
                endpoint = '/api/reports/accounting';
                break;
            default:
                return;
        }

        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            setReportData({ reportType, data });
        } catch (error) {
            console.error('Error fetching report:', error);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="w-full sm:w-1/3">
                <Select onValueChange={setReportType}>
                    <SelectTrigger>
                        <SelectValue placeholder="اختر نوع التقرير" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="performance">الأداء</SelectItem>
                        <SelectItem value="inventory">المخزون</SelectItem>
                        <SelectItem value="sales">المبيعات</SelectItem>
                        <SelectItem value="accounting">المحاسبة</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="w-full sm:w-1/3">
                <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            </div>
            <Button onClick={handleFilter} className="w-full sm:w-auto bg-blue-400 hover:bg-blue-500 text-white">
                تطبيق الفلتر
            </Button>
        </div>
    );
}

