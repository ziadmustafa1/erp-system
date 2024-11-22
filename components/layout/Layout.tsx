import { ReactNode } from 'react';
interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen flex">
            <div className="flex flex-col flex-grow">
                <main className="flex-grow container mx-auto py-20 px-6">
                    {children}
                </main>
                <footer className="bg-gray-100 text-gray-600 py-8">
                    <div className="container mx-auto px-6 text-center">
                        <p>&copy; 2024 نظام ERP. جميع الحقوق محفوظة.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
