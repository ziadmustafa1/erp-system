import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Briefcase, ShoppingCart, Package, BarChart } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const modules = [
  { name: 'إدارة الموارد البشرية', icon: Users, href: '/hr' },
  { name: 'إدارة الحسابات', icon: FileText, href: '/accounting' },
  { name: 'إدارة المشاريع', icon: Briefcase, href: '/projects' },
  { name: 'المبيعات والمشتريات', icon: ShoppingCart, href: '/sales-purchases' },
  { name: 'إدارة المخزون', icon: Package, href: '/inventory' },
  { name: 'التقارير', icon: BarChart, href: '/reports' },
];

export default function DashboardPage() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-center">لوحة التحكم</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Link href={module.href} key={module.name}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{module.name}</CardTitle>
                <module.icon className="h-6 w-6 text-gray-500" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">انقر للدخول إلى {module.name}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Layout>
  );
}