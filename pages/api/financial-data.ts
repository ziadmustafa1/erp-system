import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const invoices = await prisma.invoice.findMany();
            // Format data as needed for the chart
            const financialData = invoices.map(invoice => {
                return {
                    month: new Date(invoice.createdAt).toLocaleString('default', { month: 'short' }),
                    revenue: invoice.amount,
                    expenses: 0 // Assuming expenses is a different field or needs additional calculation
                };
            });

            // Example transformation: Summarize data by month
            const summary = financialData.reduce((acc, item) => {
                const found = acc.find(data => data.month === item.month);
                if (found) {
                    found.revenue += item.revenue;
                    found.expenses += item.expenses;
                } else {
                    acc.push({ ...item });
                }
                return acc;
            }, []);

            res.status(200).json(summary);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
