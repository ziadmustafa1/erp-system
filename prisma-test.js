// prisma-test.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Connecting to Prisma...');
        const productData = await prisma.inventoryItem.findFirst({ where: { name: 'ziad mustafa' } });
        console.log('Product data from Prisma:', productData);

        if (!productData) {
            console.log('Product not found');
            return;
        }

        console.log('Creating order...');
        const order = await prisma.order.create({
            data: {
                customerName: 'ziad mustafa',
                customerNumber: '201154790469',
                product: 'ziad mustafa',
                quantity: 2,
                orderDate: new Date('2024-11-19'),
                amount: 2 * productData.price,
                status: 'جديد'
            }
        });
        console.log('Order created:', order);

        console.log('Updating inventory...');
        const updatedInventory = await prisma.inventoryItem.update({
            where: { id: productData.id },
            data: {
                quantity: {
                    decrement: 2
                }
            }
        });
        console.log('Inventory updated:', updatedInventory);

        console.log('Order created successfully');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
