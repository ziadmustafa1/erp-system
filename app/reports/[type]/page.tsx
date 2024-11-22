import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ReportFilter from '@/components/reports/ReportFilter'
import PerformanceReport from '@/components/reports/PerformanceReport'
import InventoryReport from '@/components/reports/InventoryReport'
import SalesReport from '@/components/reports/SalesReport'
import AccountingReport from '@/components/reports/AccountingReport'

type ReportType = 'performance' | 'inventory' | 'sales' | 'accounting'

const reportTitles: Record<ReportType, string> = {
  performance: 'تقرير الأداء',
  inventory: 'تقرير المخزون',
  sales: 'تقرير المبيعات',
  accounting: 'التقرير المحاسبي',
}

export async function generateMetadata({ params }: { params: { type: ReportType } }): Promise<Metadata> {
  const title = reportTitles[params.type]
  if (!title) {
    return {
      title: 'تقرير غير موجود',
    }
  }
  return {
    title: `${title} | نظام ERP`,
    description: `عرض وتحليل بيانات ${title} بطريقة تفاعلية`,
  }
}

export default function ReportPage({ params }: { params: { type: ReportType } }) {
  const title = reportTitles[params.type]

  if (!title) {
    notFound()
  }

  return (
    <div className="container mx-auto p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">{title}</h1>
      <ReportFilter />
      <div className="mt-4">
        {params.type === 'performance' && <PerformanceReport />}
        {params.type === 'inventory' && <InventoryReport />}
        {params.type === 'sales' && <SalesReport />}
        {params.type === 'accounting' && <AccountingReport />}
      </div>
    </div>
  )
}

