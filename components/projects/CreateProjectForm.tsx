'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';

interface Project {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
}

export default function CreateProjectForm() {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const projectData: Project = { name, description, startDate, endDate, status };

    try {
      const response = await fetch('/api/projects/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });
      if (response.ok) {
        setName('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setStatus('');
        toast({
          title: 'تم إنشاء المشروع بنجاح',
          description: `اسم المشروع: ${name}`,
        });
      } else {
        throw new Error('فشل في إنشاء المشروع');
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'حدث خطأ',
        description: 'حدث خطأ أثناء إنشاء المشروع',
        variant: 'destructive', // تأكد من تطابق الأنواع
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">اسم المشروع</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">وصف المشروع</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="startDate">تاريخ البدء</Label>
        <Input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="endDate">تاريخ الانتهاء المتوقع</Label>
        <Input
          id="endDate"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="status">الحالة</Label>
        <Select onValueChange={(value) => setStatus(value)} required>
          <SelectTrigger>
            <SelectValue placeholder="اختر حالة المشروع" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="في انتظار">في انتظار</SelectItem>
            <SelectItem value="قيد التنفيذ">قيد التنفيذ</SelectItem>
            <SelectItem value="مكتمل">مكتمل</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
        إنشاء مشروع
      </Button>
    </form>
  );
}
