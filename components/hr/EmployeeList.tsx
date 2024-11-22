'use client';

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import EditEmployeeForm from '../ui/EditEmployeeForm';

interface Employee {
    id: string;
    name: string;
    position: string;
    department: string;
}

export default function EmployeeList() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

    const fetchEmployees = async () => {
        try {
            const response = await fetch('/api/employees');
            const data = await response.json();
            if (Array.isArray(data)) {
                setEmployees(data);
            } else {
                console.error('Expected an array, but received:', data);
                setEmployees([]);
            }
        } catch (error) {
            console.error('Error fetching employees:', error);
            setEmployees([]);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/employees/delete?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setEmployees(employees.filter(employee => employee.id !== id));
            } else {
                console.error('Error deleting employee:', await response.json());
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleSave = () => {
        setEditingEmployee(null);
        fetchEmployees(); // Refresh employee list after updating
    };

    return (
        <div>
            {editingEmployee ? (
                <EditEmployeeForm
                    employee={editingEmployee}
                    onSave={handleSave}
                    onCancel={() => setEditingEmployee(null)}
                />
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>الاسم</TableHead>
                            <TableHead>المنصب</TableHead>
                            <TableHead>القسم</TableHead>
                            <TableHead>الإجراءات</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell>{employee.position}</TableCell>
                                <TableCell>{employee.department}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="mr-2"
                                        onClick={() => setEditingEmployee(employee)}
                                    >
                                        تعديل
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(employee.id)}
                                    >
                                        حذف
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
