/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
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
            text: 'تقرير المخزون',
        },
    },
}

interface InventoryReportProps {
    data?: Record<string, any>;
}

export default function InventoryReport({ data }: InventoryReportProps) {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'الكمية المتوفرة',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    });

    useEffect(() => {
        if (data) {
            const labels = data.map((product: any) => product.name);
            const quantities = data.map((product: any) => product.quantity);

            setChartData({
                labels,
                datasets: [
                    {
                        label: 'الكمية المتوفرة',
                        data: quantities,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    },
                ],
            });
        }
    }, [data]);

    return (
        <div className="w-full h-96">
            <Bar options={options} data={chartData} />
        </div>
    )
}

