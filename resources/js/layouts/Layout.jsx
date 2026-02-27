import Header from '../components/Header';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';
import { usePage, Head } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { useEffect } from 'react';


export default function Layout({ children, breadcrumbItems }) {
    const { flash, errors } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
        // Handle validation errors
        if (errors && Object.keys(errors).length > 0) {
            Object.values(errors).forEach(error => {
                const errorMessage = Array.isArray(error) ? error[0] : error;
                toast.error(errorMessage);
            });
        }
    }, [flash, errors]);

    return (
        <>
            <Head title="GjejProne" />
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
        </>
    );
}
