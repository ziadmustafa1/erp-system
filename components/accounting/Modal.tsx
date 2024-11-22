'use client';

import { ReactNode } from 'react';
import { Button } from "@/components/ui/button";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ children, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg max-w-lg w-full">
        <div className="flex justify-end">
          <Button onClick={onClose} variant="outline">إغلاق</Button>
        </div>
        {children}
      </div>
    </div>
  );
}
