import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const { id } = req.query;
        const { customer, amount, status } = req.body;
        const updatedInvoice = await prisma.invoice.update({
            where: { id: parseInt(id as string) },
            data: { customer, amount, status },
        });
        res.status(200).json(updatedInvoice);
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
