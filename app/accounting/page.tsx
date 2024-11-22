import { Metadata } from 'next'
import InvoiceList from '../../components/accounting/InvoiceList'
import CreateInvoiceForm from '../../components/accounting/CreateInvoiceForm'
import FinancialReport from '../../components/accounting/FinancialReport'

export const metadata: Metadata = {
  title: 'إدارة الحسابات | نظام ERP',
  description: 'تتبع الإيرادات والنفقات وإدارة الفواتير',
}

export default function AccountingPage() {
  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-gray-600">إدارة الحسابات</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-600">قائمة الفواتير</h2>
          <InvoiceList />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-600">إنشاء فاتورة جديدة</h2>
          <CreateInvoiceForm />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-600">التقرير المالي الشهري</h2>
        <FinancialReport />
      </div>
    </div>
  )
}

