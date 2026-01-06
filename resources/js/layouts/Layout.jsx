import Header from '../components/Header';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';
import { usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { useEffect } from 'react';


export default function Layout({ children, breadcrumbItems }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);
    return (
        <div className="pt-20 grid">
            <Header breadcrumbItems={breadcrumbItems} />
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: "#333",
                        color: "#fff",
                        borderRadius: "8px",
                        padding: "10px 20px",
                    },
                }}
            />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}
