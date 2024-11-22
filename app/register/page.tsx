import { Metadata } from 'next'
import RegisterForm from '@/components/auth/RegisterForm'

export const metadata: Metadata = {
  title: 'إنشاء حساب | نظام ERP',
  description: 'صفحة إنشاء حساب جديد لنظام تخطيط موارد المؤسسات',
}

export default function RegisterPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">إنشاء حساب جديد</h1>
      <div className="max-w-md mx-auto">
        <RegisterForm />
      </div>
    </div>
  )
}

