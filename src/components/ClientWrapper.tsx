'use client';

import { store } from '@/lib/hooks/store';
import { usePathname } from 'next/navigation';
import { Provider } from 'react-redux';
import Footer from './footer';
import Navbar from './navbar';
export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const showNavbarAndFooter = !['/login', '/sign-up'].includes(pathname);

    return (
        <Provider store={store}>
            {showNavbarAndFooter && <Navbar />}
            <main className="flex min-h-screen flex-col justify-between p-24 max-w-7xl mx-auto w-full px-4 py-5 text-sm">
                {children}
            </main>
            {showNavbarAndFooter && <Footer />}
        </Provider>
    );
}
