import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const prisma = new PrismaClient()

export async function generateStaticParams() {
    const orders = await prisma.order.findMany({ select: { id: true } })
    return orders.map((order) => ({
        id: order.id.toString(),
    }))
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const order = await prisma.order.findUnique({ where: { id: parseInt(params.id) } })
    if (!order) {
        return {
            title: 'طلب غير موجود',
        }
    }
    return {
        title: `تفاصيل الطلب ${order.id} | نظام ERP`,
        description: `تفاصيل الطلب لـ ${order.customerName}`,
    }
}

export default async function OrderPage({ params }: { params: { id: string } }) {
    const order = await prisma.order.findUnique({ where: { id: parseInt(params.id) } })

    if (!order) {
        notFound()
    }

    return (
        <div className="container mx-auto p-4 bg-gray-50">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">تفاصيل الطلب #{order.id}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">معلومات الطلب</h2>
                    <p><strong>اسم العميل:</strong> {order.customerName}</p>
                    <p><strong>المنتج:</strong> {order.product}</p>
                    <p><strong>الكمية:</strong> {order.quantity}</p>
                    <p><strong>تاريخ الطلب:</strong> {order.orderDate.toLocaleDateString('ar-SA')}</p>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">صورة المنتج</h2>
                    <Image
                        src={`/placeholder.svg?height=300&width=300`}
                        alt={order.product}
                        width={300}
                        height={300}
                        className="rounded-lg"
                    />
                </div>
            </div>
            <div className="mt-4">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">تحديث الطلب</Button>
            </div>
        </div>
    )
}

