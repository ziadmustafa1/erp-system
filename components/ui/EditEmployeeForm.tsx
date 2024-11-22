'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from '@/hooks/use-toast';

interface EditEmployeeFormProps {
    employee: {
        id: string;
        name: string;
        position: string;
        department: string;
    };
    onSave: () => void;
}

export default function EditEmployeeForm({ employee, onSave }: EditEmployeeFormProps) {
    const [name, setName] = useState(employee.name);
    const [position, setPosition] = useState(employee.position);
    const [department, setDepartment] = useState(employee.department);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`/api/employees/update?id=${employee.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, position, department }),
            });

            if (response.ok) {
                toast({
                    title: 'تم تحديث الموظف بنجاح',
                    description: 'تم تحديث بيانات الموظف بنجاح.',
                });
                onSave();
            } else {
                const errorData = await response.json();
                console.error('Error updating employee:', errorData);
                toast({
                    title: 'خطأ في تحديث الموظف',
                    description: 'حدث خطأ أثناء تحديث بيانات الموظف. حاول مرة أخرى.',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Error updating employee:', error);
            toast({
                title: 'خطأ',
                description: 'حدث خطأ أثناء تحديث بيانات الموظف.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">الاسم</Label>
                <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="position">المنصب</Label>
                <Input id="position" type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="department">القسم</Label>
                <Input id="department" type="text" value={department} onChange={(e) => setDepartment(e.target.value)} required />
            </div>
            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'جاري تحديث الموظف...' : 'تحديث الموظف'}
            </Button>
        </form>
    );
}
