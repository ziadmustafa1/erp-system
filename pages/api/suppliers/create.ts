// pages/api/suppliers/create.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, product, contact } = req.body;
        try {
            const supplier = await prisma.supplier.create({
                data: {
                    name,
                    product,
                    contact,
                }
            });
            res.status(201).json(supplier);
        } catch (error) {
            console.error('Error creating supplier:', error);
            res.status(500).json({ error: 'Failed to create supplier' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
