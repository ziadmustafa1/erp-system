// pages/api/orders/create.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { customerName, customerNumber, product, quantity, orderDate } = req.body;

        console.log('Received request data:', req.body);

        if (!customerName || !customerNumber || !product || !quantity || !orderDate) {
            console.log('Missing required fields');
            return res.status(400).json({ error: 'All fields are required' });
        }

        try {
            console.log('Connecting to Prisma...');
            const productData = await prisma.inventoryItem.findFirst({ where: { name: product } });
            console.log('Product data from Prisma:', productData);

            if (!productData) {
                console.log('Product not found');
                return res.status(404).json({ error: 'Product not found' });
            }

            console.log('Creating order...');
            const order = await prisma.order.create({
                data: {
                    customerName,
                    customerNumber,
                    product,
                    quantity,
                    orderDate: new Date(orderDate),
                    amount: quantity * productData.price,
                    status: 'جديد'
                }
            });
            console.log('Order created:', order);

            console.log('Updating inventory...');
            const updatedInventory = await prisma.inventoryItem.update({
                where: { id: productData.id },
                data: {
                    quantity: {
                        decrement: quantity
                    }
                }
            });
            console.log('Inventory updated:', updatedInventory);

            console.log('Order created successfully');
            res.status(201).json(order);
        } catch (error) {
            console.error('Error creating order:', error);
            res.status(500).json({ error: 'Failed to create order' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
