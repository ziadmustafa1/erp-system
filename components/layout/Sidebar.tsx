'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, FileText, Briefcase, ShoppingCart, Package, BarChart } from 'lucide-react';

const modules = [
  { name: 'إدارة الموارد البشرية', icon: Users, href: '/hr' },
  { name: 'إدارة الحسابات', icon: FileText, href: '/accounting' },
  { name: 'إدارة المشاريع', icon: Briefcase, href: '/projects' },
  { name: 'المبيعات والمشتريات', icon: ShoppingCart, href: '/sales-purchases' },
  { name: 'إدارة المخزون', icon: Package, href: '/inventory' },
  { name: 'التقارير', icon: BarChart, href: '/reports' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-full min-h-screen p-4 sticky top-0 bg-gray-800 text-white">
      <ul>
        {modules.map((module) => (
          <li key={module.name} className={`p-4 ${pathname === module.href ? 'bg-slate-700 hover:bg-slate-600' : 'hover:bg-slate-400'}`}>
            <Link href={module.href} className="flex items-center">
              <module.icon className="h-6 w-6 mr-2" />
              {module.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
