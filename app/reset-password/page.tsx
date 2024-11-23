'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export default function ResetPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                toast({
                    title: 'تم إرسال رابط إعادة تعيين كلمة المرور',
                    description: 'يرجى التحقق من بريدك الإلكتروني',
                });
            } else {
                toast({
                    title: 'فشل في إرسال رابط إعادة التعيين',
                    description: 'يرجى التحقق من البريد الإلكتروني والمحاولة مرة أخرى',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            toast({
                title: 'خطأ',
                description: 'حدث خطأ أثناء إرسال رابط إعادة التعيين',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">إعادة تعيين كلمة المرور</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">البريد الإلكتروني</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'جاري إرسال الرابط...' : 'إرسال رابط إعادة التعيين'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

