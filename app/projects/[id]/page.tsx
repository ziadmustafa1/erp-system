import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function generateStaticParams() {
    const projects = await prisma.project.findMany({ select: { id: true } });
    return projects.map((project) => ({
        id: project.id.toString(),
    }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const project = await prisma.project.findUnique({ where: { id: parseInt(params.id) } });
    if (!project) {
        return {
            title: 'مشروع غير موجود',
        };
    }
    return {
        title: `${project.name} | إدارة المشاريع`,
        description: project.description,
    };
}

interface PageProps {
    params: { id: string };
}

export default async function ProjectPage({ params }: PageProps) {
    const project = await prisma.project.findUnique({ where: { id: parseInt(params.id) } });

    if (!project) {
        notFound();
    }

    return (
        <div className="container mx-auto p-4 bg-indigo-50">
            <h1 className="text-2xl font-bold mb-4 text-gray-900">{project.name}</h1>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h2 className="text-xl font-semibold mb-2 text-gray-900">تفاصيل المشروع</h2>
                    <p><strong>الحالة:</strong> {project.status}</p>
                    <p><strong>تاريخ البدء:</strong> {new Date(project.startDate).toLocaleDateString('ar-SA')}</p>
                    <p><strong>تاريخ الانتهاء المتوقع:</strong> {new Date(project.endDate).toLocaleDateString('ar-SA')}</p>
                </div>
                {/* Add more project details or components here */}
            </div>
        </div>
    );
}
