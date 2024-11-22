// pages/api/employees/data.ts

export interface Employee {
    id: string;
    name: string;
    position: string;
    department: string;
}

export let employees: Employee[] = [
    { id: '1', name: 'موظف 1', position: 'مدير', department: 'الإدارة' },
    { id: '2', name: 'موظف 2', position: 'مطور', department: 'التكنولوجيا' }
];

export const addEmployee = (employee: Employee) => {
    employees.push(employee);
};

export const updateEmployee = (id: string, updatedEmployee: Partial<Employee>) => {
    employees = employees.map(employee => 
        employee.id === id ? { ...employee, ...updatedEmployee } : employee
    );
};
