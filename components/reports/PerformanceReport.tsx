/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'تقرير الأداء الشهري',
        },
    },
}

interface PerformanceReportProps {
    data?: Record<string, any>;
}

export default function PerformanceReport({ data }: PerformanceReportProps) {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'الإيرادات',
                data: [],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'المصروفات',
                data: [],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    });

    useEffect(() => {
        if (data) {
            const labels = data.map((item: any) => new Date(item.startDate).toLocaleString('default', { month: 'long' }));
            const revenue = data.map((item: any) => item.revenue);
            const expenses = data.map((item: any) => item.expenses);

            setChartData({
                labels,
                datasets: [
                    {
                        label: 'الإيرادات',
                        data: revenue,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                    {
                        label: 'المصروفات',
                        data: expenses,
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                ],
            });
        }
    }, [data]);

    return (
        <div className="w-full h-96">
            <Line options={options} data={chartData} />
        </div>
    )
}

