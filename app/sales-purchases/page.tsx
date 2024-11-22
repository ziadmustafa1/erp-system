import { Metadata } from 'next'
import CustomerOrderForm from '@/components/sales-purchases/CustomerOrderForm'
import OrderList from '@/components/sales-purchases/OrderList'
import ShipmentTracking from '@/components/sales-purchases/ShipmentTracking'
import SupplierManagement from '@/components/sales-purchases/SupplierManagement'
import MonthlySalesAnalysis from '@/components/sales-purchases/MonthlySalesAnalysis'

export const metadata: Metadata = {
    title: 'إدارة المبيعات والمشتريات | نظام ERP',
    description: 'إدارة عمليات البيع وطلبات الشراء وتحليل المبيعات',
}

export default function SalesPurchasesPage() {
    return (
        <div className="container mx-auto p-4 bg-gray-50">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">إدارة المبيعات والمشتريات</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">إنشاء طلب جديد</h2>
                    <CustomerOrderForm />
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">قائمة الطلبات</h2>
                    <OrderList />
                </div>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">تتبع الشحنات</h2>
                    <ShipmentTracking />
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">إدارة الموردين</h2>
                    <SupplierManagement />
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">تحليل المبيعات الشهرية</h2>
                <MonthlySalesAnalysis />
            </div>
        </div>
    )
}

