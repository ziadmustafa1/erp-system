// types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    role: string;  // إضافة الدور
    username: string;
  }

  interface Session {
    user: User;
  }

  interface JWT {
    id: string;
    email: string;
    role: string;  // إضافة الدور
  }
}
