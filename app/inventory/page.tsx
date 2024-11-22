import { Metadata } from 'next'
import ProductList from '@/components/inventory/ProductList'
import AddProductForm from '@/components/inventory/AddProductForm'
import InventoryReport from '@/components/inventory/InventoryReport'

export const metadata: Metadata = {
  title: 'إدارة المخزون | نظام ERP',
  description: 'إدارة وتتبع المخزون والمنتجات',
}

export default function InventoryPage() {
  return (
    <div className="container mx-auto p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">إدارة المخزون</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900">قائمة المنتجات</h2>
          <ProductList />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900">إضافة منتج جديد</h2>
          <AddProductForm />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-900">تقرير المخزون</h2>
        <InventoryReport />
      </div>
    </div>
  )
}
