'use client';  // إضافة توجيه العميل

import PerformanceReport from '@/components/reports/PerformanceReport';
import InventoryReport from '@/components/reports/InventoryReport';
import SalesReport from '@/components/reports/SalesReport';
import AccountingReport from '@/components/reports/AccountingReport';
import ReportFilter from '@/components/reports/ReportFilter';
import { useState } from 'react';

export default function ReportsPage() {
  const [setReportData] = useState<any>(null);

  return (
    <div className="container mx-auto p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">إدارة التقارير</h1>
      <ReportFilter setReportData={setReportData} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-700">تقرير الأداء الشهري</h2>
          <PerformanceReport/>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-700">تقرير المخزون</h2>
          <InventoryReport/>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-700">تقرير المبيعات</h2>
          <SalesReport/>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-700">التقرير المحاسبي</h2>
          <AccountingReport/>
        </div>
      </div>
    </div>
  );
}
