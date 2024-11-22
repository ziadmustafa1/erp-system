import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'الصفحة الرئيسية | نظام ERP',
  description: 'نظام تخطيط موارد المؤسسات الشامل',
}

export default function HomePage() {
  return (
      <div className="space-y-8 p-4">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-4">مرحبًا بك في نظام ERP</h1>
          <p className="text-xl text-gray-600 mb-6">حل شامل لإدارة موارد مؤسستك</p>
          <Link href="/register">
            <Button size="lg">ابدأ الآن مجانًا</Button>
          </Link>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>لماذا نظامنا؟</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>إدارة شاملة لجميع موارد المؤسسة</li>
                <li>واجهة سهلة الاستخدام وبديهية</li>
                <li>تقارير تفصيلية ولوحات تحكم مخصصة</li>
                <li>دعم فني على مدار الساعة</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>الوحدات المتاحة</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>إدارة الموارد البشرية</li>
                <li>المحاسبة والمالية</li>
                <li>إدارة المشاريع</li>
                <li>المبيعات والمشتريات</li>
                <li>إدارة المخزون</li>
                <li>التقارير والتحليلات</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">كيفية البدء</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>قم بإنشاء حساب جديد</li>
            <li>أكمل إعداد ملف الشركة الخاص بك</li>
            <li>اختر الوحدات التي تحتاجها</li>
            <li>ابدأ في إدخال البيانات وإدارة مؤسستك</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">الوثائق</h2>
          <p className="mb-4">للحصول على معلومات مفصلة حول كيفية استخدام النظام، يرجى الرجوع إلى وثائقنا الشاملة.</p>
          <Link href="/docs">
            <Button variant="outline">استعرض الوثائق</Button>
          </Link>
        </section>
      </div>
  )
}