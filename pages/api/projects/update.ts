import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const { id } = req.query;
        const { name, description, startDate, endDate, status } = req.body;
        try {
            const updatedProject = await prisma.project.update({
                where: { id: parseInt(id as string) },
                data: { name, description, startDate: new Date(startDate), endDate: new Date(endDate), status },
            });
            res.status(200).json(updatedProject);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
