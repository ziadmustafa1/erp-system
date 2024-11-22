'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface EditProjectFormProps {
    project: {
        id: string;
        name: string;
        description: string;
        startDate: string;
        endDate: string;
        status: string;
    };
    onSave: () => void;
    onCancel: () => void;
}

export default function EditProjectForm({ project, onSave, onCancel }: EditProjectFormProps) {
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [startDate, setStartDate] = useState(project.startDate.split('T')[0]);
    const [endDate, setEndDate] = useState(project.endDate.split('T')[0]);
    const [status, setStatus] = useState(project.status);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/projects/update`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: project.id, name, description, startDate, endDate, status }),
            });

            const result = await response.json();
            console.log('API Response:', result);

            if (response.ok) {
                onSave();
            } else {
                console.error('Failed to update project:', result);
            }
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex items-center justify-center">
            <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg border-2 border-blue-500">
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">تعديل المشروع</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">اسم المشروع</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="border-2 border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <Label htmlFor="description">وصف المشروع</Label>
                        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required className="border-2 border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <Label htmlFor="startDate">تاريخ البدء</Label>
                        <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required className="border-2 border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <Label htmlFor="endDate">تاريخ الانتهاء المتوقع</Label>
                        <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required className="border-2 border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <Label htmlFor="status">الحالة</Label>
                        <Select onValueChange={setStatus} value={status}>
                            <SelectTrigger>
                                <SelectValue placeholder="اختر حالة المشروع" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="في انتظار">في انتظار</SelectItem>
                                <SelectItem value="قيد التنفيذ">قيد التنفيذ</SelectItem>
                                <SelectItem value="مكتمل">مكتمل</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">حفظ</Button>
                        <Button type="button" className="bg-gray-500 hover:bg-gray-600 text-white" onClick={onCancel}>إلغاء</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
