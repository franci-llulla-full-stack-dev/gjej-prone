import Header from '../components/Header';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';

export default function Layout({ children }) {
    return (
        <div className="pt-20 grid">
            <Header />
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
