'use client';

import { useState } from 'react';
import PerformanceReport from '@/components/reports/PerformanceReport';
import InventoryReport from '@/components/reports/InventoryReport';
import SalesReport from '@/components/reports/SalesReport';
import AccountingReport from '@/components/reports/AccountingReport';
import ReportFilter from '@/components/reports/ReportFilter';

interface ReportData {
  reportType: string;
  data: Record<string, unknown>;
}

export default function ReportsPage() {
  const [reportData, setReportData] = useState<ReportData | null>(null);

  return (
    <div className="container mx-auto p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">إدارة التقارير</h1>
      <ReportFilter setReportData={setReportData} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-700">تقرير الأداء الشهري</h2>
          <PerformanceReport data={reportData?.reportType === 'performance' ? reportData.data : undefined} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-700">تقرير المخزون</h2>
          <InventoryReport data={reportData?.reportType === 'inventory' ? reportData.data : undefined} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-700">تقرير المبيعات</h2>
          <SalesReport data={reportData?.reportType === 'sales' ? reportData.data : undefined} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-700">التقرير المحاسبي</h2>
          <AccountingReport/>
        </div>
      </div>
    </div>
  );
}
