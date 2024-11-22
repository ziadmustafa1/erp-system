'use client';

import { Button } from "@/components/ui/button";

interface ProjectDetailsProps {
    project: {
        id: string;
        name: string;
        description: string;
        startDate: string;
        endDate: string;
        status: string;
    };
    onClose: () => void;
}

export default function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
    if (!project) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex items-center justify-center">
            <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg border-2 border-blue-500">
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">تفاصيل المشروع</h2>
                <p className="mb-2"><strong>اسم المشروع:</strong> {project.name}</p>
                <p className="mb-2"><strong>الوصف:</strong> {project.description}</p>
                <p className="mb-2"><strong>تاريخ البدء:</strong> {new Date(project.startDate).toLocaleDateString()}</p>
                <p className="mb-2"><strong>تاريخ الانتهاء:</strong> {new Date(project.endDate).toLocaleDateString()}</p>
                <p className="mb-2"><strong>الحالة:</strong> {project.status}</p>
                <Button onClick={onClose} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white">إغلاق</Button>
            </div>
        </div>
    );
}
