import { Metadata } from 'next'
import AddEmployeeForm from '@/components/hr/AddEmployeeForm'
import EmployeeList from '@/components/hr/EmployeeList'

export const metadata: Metadata = {
    title: 'إدارة الموارد البشرية | نظام ERP',
    description: 'إدارة شؤون الموظفين وعرض قائمة الموظفين',
}

export default function HRPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">إدارة الموارد البشرية</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h2 className="text-xl font-semibold mb-2 text-gray-700">قائمة الموظفين</h2>
                    <EmployeeList />
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2 text-gray-700">إضافة موظف جديد</h2>
                    <AddEmployeeForm />
                </div>
            </div>
        </div>
    )
}

