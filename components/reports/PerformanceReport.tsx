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

export default function PerformanceReport() {
    const [data, setData] = useState({
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
        const fetchData = async () => {
            try {
                const response = await fetch('/api/reports/performance');
                const performance = await response.json();
                const labels = performance.map(item => new Date(item.startDate).toLocaleString('default', { month: 'long' }));
                const revenue = performance.map(item => item.revenue);
                const expenses = performance.map(item => item.expenses);

                setData({
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
            } catch (error) {
                console.error('Error fetching performance data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full h-96">
            <Line options={options} data={data} />
        </div>
    )
}
