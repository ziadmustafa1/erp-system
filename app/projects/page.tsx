import { Metadata } from 'next'
import ProjectList from '@/components/projects/ProjectList'
import CreateProjectForm from '@/components/projects/CreateProjectForm'
import ProjectTimeline from '@/components/projects/ProjectTimeline'

export const metadata: Metadata = {
  title: 'إدارة المشاريع | نظام ERP',
  description: 'تنظيم المشاريع والمهام وتتبع حالتها',
}

export default function ProjectManagementPage() {
  return (
    <div className="container mx-auto p-4 bg-indigo-50">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">إدارة المشاريع</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900">قائمة المشاريع</h2>
          <ProjectList />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900">إنشاء مشروع جديد</h2>
          <CreateProjectForm />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-900">الجدول الزمني للمشاريع</h2>
        <ProjectTimeline />
      </div>
    </div>
  )
}

