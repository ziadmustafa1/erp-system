import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

export default function Navigation() {
    const router = useRouter();
    const { data: session } = useSession();

    return (
        <nav className="bg-gray-800 p-4 text-white">
            <ul className="flex space-x-4">
                <li className={router.pathname === '/dashboard' ? 'font-bold' : ''}>
                    <Link href="/dashboard">Dashboard</Link>
                </li>
                <li className={router.pathname === '/profile' ? 'font-bold' : ''}>
                    <Link href="/profile">Profile</Link>
                </li>
                <li>
                    {session ? (
                        <button onClick={() => signOut()}>Logout</button>
                    ) : (
                        <>
                            <Link href="/login">Login</Link>
                            <Link href="/signup" className="ml-4">Signup</Link>
                        </>
                    )}
                </li>
            </ul>
        </nav>
    );
}
