'use client';

import { useState, useEffect } from 'react';

interface Supplier {
  id: string;
  name: string;
  product: string;
  contact: string;
}

export default function ShipmentTracking() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('/api/suppliers');
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data: Supplier[] = await response.json();
          console.log('Received suppliers:', data); // للتحقق من البيانات

          if (Array.isArray(data)) {
            setSuppliers(data);
          } else {
            console.error('Expected an array, but received:', data);
            setSuppliers([]);
          }
        } else {
          const text = await response.text();
          console.error('Expected JSON, but received HTML:', text);
          setSuppliers([]);
        }
      } catch (error) {
        console.error('Error fetching suppliers:', error);
        setSuppliers([]);
      }
    };

    fetchSuppliers();
  }, []);

  return (
    <div>
      {/* ربط البيانات المستلمة بالواجهة الرسومية */}
      {suppliers.map((supplier) => (
        <div key={supplier.id}>
          <h3>{supplier.name}</h3>
          <p>{supplier.product}</p>
          <p>{supplier.contact}</p>
        </div>
      ))}
    </div>
  );
}
