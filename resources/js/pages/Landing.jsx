// javascript
import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import backgroundImage from '../media/background.jpeg';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const Landing = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 100); // vonesë e vogël për të nisur animacionin
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative pb-25">
            <Header />

            {/* Imazhi i sfondit */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="absolute inset-0 bg-black/40"></div> {/* mbulesë e errët për lexueshmëri më të mirë */}
            </div>

            {/* Përmbajtja */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
                <h2
                    className={`text-2xl md:text-5xl font-bold text-white mb-4 transform transition-all duration-1000 ease-out ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                >
                    Gjej pronën perfekte në Shqipëri
                </h2>
                <p
                    className={`mt-2 text-lg md:text-xl text-white/90 mb-6 max-w-2xl transform transition-all duration-1000 delay-200 ease-out ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                >
                    Bli, jep me qira ose publiko shtëpinë apo apartamentin tënd. Shpejt, e sigurt dhe e lehtë.
                </p>
                <div
                    className={`flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 transform transition-all duration-1000 delay-400 ease-out ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                >
                    <Link
                        href="/listed-properties"
                        className="px-6 py-3 bg-blue-400 text-white rounded hover:bg-blue-600 transition"
                    >
                        Shiko Pronat
                    </Link>
                    <Link
                        href="/register"
                        className="px-6 py-3 border border-white text-white rounded hover:bg-white hover:text-blue-600 transition"
                    >
                        Publiko Pronën Tënde
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Landing;
