import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        try {
            const user = await prisma.user.findUnique({ where: { email } });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // TODO: Implement email sending logic here
            // For now, we'll just return a success message
            res.status(200).json({ message: 'Password reset link sent to your email' });
        } catch (error) {
            console.error('Error finding user:', error);
            res.status(500).json({ error: 'Failed to process request' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

