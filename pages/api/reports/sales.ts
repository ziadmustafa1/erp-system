/* eslint-disable @typescript-eslint/no-unused-vars */
// pages/api/reports/sales.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const salesData = await prisma.order.findMany({
                select: {
                    id: true,
                    customerName: true,
                    product: true,
                    quantity: true,
                    amount: true,
                    orderDate: true,
                    status: true,
                },
            });
            res.status(200).json(salesData);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch sales data' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
