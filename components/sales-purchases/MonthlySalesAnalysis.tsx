'use client';

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'تحليل المبيعات الشهرية',
    },
  },
};

export default function MonthlySalesAnalysis() {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'المبيعات',
        data: [],
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
      },
    ],
  });

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch('/api/orders');
        const orders = await response.json();

        // Group sales data by month and year
        const monthlySales = orders.reduce((acc, order) => {
          const date = new Date(order.orderDate);
          const month = date.toLocaleString('default', { month: 'long' });
          const year = date.getFullYear();
          const key = `${month}-${year}`;

          if (!acc[key]) {
            acc[key] = 0;
          }
          acc[key] += order.amount; // Assuming `amount` is the total price of the order
          return acc;
        }, {});

        const labels = Object.keys(monthlySales);
        const salesData = Object.values(monthlySales);

        setData({
          labels,
          datasets: [
            {
              label: 'المبيعات',
              data: salesData,
              backgroundColor: 'rgba(255, 206, 86, 0.5)',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <div className="w-full h-96">
      <Bar options={options} data={data} />
    </div>
  );
}
