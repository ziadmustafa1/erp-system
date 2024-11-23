import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function POST(request: Request) {
    try {
        const { username, email, password } = await request.json()

        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username },
                    { email },
                ],
            },
        })

        if (existingUser) {
            return NextResponse.json({ error: 'المستخدم موجود بالفعل' }, { status: 400 })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        })

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser.id, username: newUser.username },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        )

        // Set the token in a cookie
        const response = NextResponse.json(
            { message: 'تم إنشاء المستخدم بنجاح', user: { id: newUser.id, username: newUser.username, email: newUser.email } },
            { status: 201 }
        )
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600, // 1 hour
            path: '/',
        })

        return response
    } catch (error) {
        console.error('Error in register route:', error)
        return NextResponse.json({ error: 'حدث خطأ أثناء إنشاء المستخدم' }, { status: 500 })
    }
}

