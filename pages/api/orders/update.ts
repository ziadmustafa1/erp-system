// pages/api/orders/update.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const { id, customerName, customerNumber, product, quantity, orderDate, status } = req.body;

        console.log('Received update request data:', req.body);

        if (!id || !customerName || !customerNumber || !product || !quantity || !orderDate || !status) {
            console.log('Missing required fields');
            return res.status(400).json({ error: 'All fields are required' });
        }

        try {
            console.log('Connecting to Prisma...');
            const order = await prisma.order.update({
                where: { id: Number(id) },
                data: {
                    customerName,
                    customerNumber,
                    product,
                    quantity,
                    orderDate: new Date(orderDate),
                    status
                }
            });
            console.log('Order updated:', order);

            // الحصول على بيانات المنتج أولاً
            const productData = await prisma.inventoryItem.findFirst({ where: { name: product } });
            console.log('Product data from Prisma:', productData);

            if (!productData) {
                console.log('Product not found for inventory update');
                return res.status(404).json({ error: 'Product not found for inventory update' });
            }

            console.log('Updating inventory...');
            const updatedInventory = await prisma.inventoryItem.update({
                where: { id: productData.id },
                data: {
                    quantity: {
                        decrement: Number(quantity)
                    }
                }
            });
            console.log('Inventory updated:', updatedInventory);

            console.log('Order updated successfully');
            res.status(200).json(order);
        } catch (error) {
            console.error('Error updating order:', error);
            res.status(500).json({ error: 'Failed to update order' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
