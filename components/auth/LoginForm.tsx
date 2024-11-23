'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await signIn('credentials', { 
                email, 
                password, 
                redirect: false,
                callbackUrl: '/dashboard'
            });

            console.log(result);

            if (result && result.ok) {
                toast({
                    title: 'تم تسجيل الدخول بنجاح',
                    description: 'جاري تحويلك إلى لوحة التحكم...',
                });
                console.log('تحويل إلى الداشبورد');
                setTimeout(() => {
                    router.push(result.url || '/dashboard');
                }, 1000);
            } else {
                toast({
                    title: 'خطأ في تسجيل الدخول',
                    description: result?.error || 'تحقق من بياناتك وأعد المحاولة',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            toast({
                title: 'خطأ',
                description: 'حدث خطأ أثناء تسجيل الدخول',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">تسجيل الدخول</CardTitle>
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
                    <div className="space-y-2">
                        <Label htmlFor="password">كلمة المرور</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
