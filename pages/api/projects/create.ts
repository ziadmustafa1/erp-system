import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, description, startDate, endDate, status } = req.body;
        try {
            const newProject = await prisma.project.create({
                data: {
                    name,
                    description,
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                    status,
                },
            });
            res.status(201).json(newProject);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
