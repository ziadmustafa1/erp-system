'use client';

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface FinancialData {
    month: string;
    revenue: number;
    expenses: number;
}

export default function FinancialReport() {
    const [data, setData] = useState<FinancialData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/financial-data');
                const result = await response.json();

                console.log('API Response:', result); // عرض البيانات للتحقق

                if (Array.isArray(result)) {
                    setData(result);
                } else {
                    console.error('Expected an array, but received:', result);
                    setData([]);
                }
            } catch (error) {
                console.error('Error fetching financial data:', error);
                setData([]);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full h-96">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" name="الإيرادات" fill="#10B981" />
                    <Bar dataKey="expenses" name="النفقات" fill="#EF4444" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
