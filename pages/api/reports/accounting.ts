// pages/api/reports/accounting.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const accountingData = await prisma.invoice.findMany({
                select: {
                    id: true,
                    createdAt: true,
                    customer: true,
                    amount: true,
                    status: true,
                },
                orderBy: {
                    createdAt: 'asc',
                },
            });
            res.status(200).json(accountingData);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch accounting data' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
