import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const { id } = req.body;
        try {
            // استرجاع الطلب
            const order = await prisma.order.findUnique({
                where: { id }
            });

            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }

            // تحديث حالة الطلب
            await prisma.order.update({
                where: { id },
                data: {
                    status: 'ملغى'
                }
            });

            // استرجاع الكمية إلى المخزون
            const inventoryItem = await prisma.inventoryItem.findFirst({
                where: { name: order.product }
            });

            if (inventoryItem) {
                await prisma.inventoryItem.update({
                    where: { id: inventoryItem.id },
                    data: {
                        quantity: {
                            increment: order.quantity
                        }
                    }
                });
            }

            res.status(200).json({ message: 'Order cancelled successfully' });
        } catch (error) {
            console.error('Error cancelling order:', error);
            res.status(500).json({ error: 'Failed to cancel order' });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
