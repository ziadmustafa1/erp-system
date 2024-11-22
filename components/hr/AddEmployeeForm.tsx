'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateEmployeeForm() {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [department, setDepartment] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('/api/employees/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, position, department }),
            });

            if (response.ok) {
                // Clear the form
                setName('');
                setPosition('');
                setDepartment('');
            } else {
                // Handle error
                console.error('Error creating employee:', await response.json());
            }
        } catch (error) {
            console.error('Error creating employee:', error);
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
                {isLoading ? 'جاري إضافة الموظف...' : 'إضافة موظف'}
            </Button>
        </form>
    );
}
