'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <nav className="container mx-auto py-4 px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          نظام ERP
        </Link>
        <div className="space-x-2">
          {status === 'loading' ? (
            <p>Loading...</p>
          ) : session ? (
            <>
              <span className="text-white">{session.user.name}</span>
              <Link href="/dashboard">
                <Button variant="secondary">لوحة التحكم</Button>
              </Link>
              <Button variant="secondary" onClick={handleSignOut}>تسجيل الخروج</Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="secondary">تسجيل الدخول</Button>
              </Link>
              <Link href="/register">
                <Button variant="secondary">إنشاء حساب</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
