import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { customer, amount, status } = req.body;
            if (typeof amount !== 'number') {
                throw new Error('Invalid amount type');
            }
            const newInvoice = await prisma.invoice.create({
                data: {
                    customer,
                    amount,
                    status,
                },
            });
            res.status(201).json(newInvoice);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
