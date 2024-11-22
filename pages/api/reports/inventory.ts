// pages/api/reports/inventory.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const inventoryData = await prisma.inventoryItem.findMany({
                select: {
                    id: true,
                    name: true,
                    quantity: true,
                    price: true,
                },
            });
            res.status(200).json(inventoryData);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch inventory data' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
