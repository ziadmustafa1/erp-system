// pages/api/reports/performance.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const performanceData = await prisma.project.findMany({
                select: {
                    id: true,
                    name: true,
                    startDate: true,
                    endDate: true,
                    status: true,
                },
            });
            res.status(200).json(performanceData);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch performance data' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
