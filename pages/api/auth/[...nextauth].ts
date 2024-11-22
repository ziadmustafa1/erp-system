import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.error("No credentials provided");
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            console.error("User not found");
            return null;
          }

          const isPasswordValid = bcrypt.compareSync(credentials.password, user.password);
          if (!isPasswordValid) {
            console.error("Invalid password");
            return null;
          }

          return {
            id: user.id.toString(),
            email: user.email,
            role: user.role,
            username: user.username,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          };
        } catch (error) {
          console.error("Error in authorize method:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;  // تأكد من إضافة البريد الإلكتروني
        session.user.role = token.role as string;  // إضافة الدور
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;  // إضافة البريد الإلكتروني
        token.role = user.role;  // إضافة الدور
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
    newUser: '/dashboard',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
