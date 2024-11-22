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

export default function InventoryReport() {
    const [data, setData] = useState({
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
        const fetchData = async () => {
            try {
                const response = await fetch('/api/reports/inventory');
                const products = await response.json();
                const labels = products.map(product => product.name);
                const quantities = products.map(product => product.quantity);

                setData({
                    labels,
                    datasets: [
                        {
                            label: 'الكمية المتوفرة',
                            data: quantities,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full h-96">
            <Bar options={options} data={data} />
        </div>
    )
}
