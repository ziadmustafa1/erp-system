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
      text: 'تقرير المخزون',
    },
  },
};

interface Product {
  name: string;
  quantity: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

export default function InventoryReport() {
  const [data, setData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: 'الكمية',
        data: [],
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/products');
        const products: Product[] = await response.json();
        console.log('Received products:', products); // للتحقق من البيانات

        if (Array.isArray(products)) {
          const labels = products.map(product => product.name);
          const quantities = products.map(product => product.quantity);

          setData({
            labels,
            datasets: [
              {
                label: 'الكمية',
                data: quantities,
                backgroundColor: 'rgba(34, 197, 94, 0.5)',
              },
            ],
          });
        } else {
          console.error('Expected an array, but received:', products);
          setData({ labels: [], datasets: [] });
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setData({ labels: [], datasets: [] });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-96">
      <Bar options={options} data={data} />
    </div>
  );
}
