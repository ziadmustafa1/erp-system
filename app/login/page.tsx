import { Metadata } from 'next'
import Layout from '@/components/layout/Layout'
import LoginForm from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'تسجيل الدخول | نظام ERP',
  description: 'صفحة تسجيل الدخول لنظام تخطيط موارد المؤسسات',
}

export default function LoginPage() {
  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <LoginForm />
      </div>
    </Layout>
  )
}