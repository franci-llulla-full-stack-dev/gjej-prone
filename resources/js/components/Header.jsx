import backgroundImage from '../media/background.jpeg';
import React from 'react';
import { Link, usePage } from '@inertiajs/react';
const Header = () => {
    const { auth } = usePage().props;
    console.log(auth);
    const role = auth?.user?.role || "guest";
    return (
        <header className="bg-white/90 backdrop-blur shadow-sm fixed top-0 w-dvw z-50">
            <div className="container mx-auto px-2 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center">
                    <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight text-gray-900 flex">
                        <img src="/logo-2.png" alt="Logo" className="h-auto w-12 me-2"/>
                        <div className="self-center">
                            Gjej<span className="text-blue-400">Prone</span>.al
                        </div>
                    </h1>
                </Link>
                <nav className="flex items-center gap-1 text-sm sm:text-base">
                    {role === 'guest' && (
                        <div>
                            <Link
                                href="/login"
                                className="px-1 py-1.5 text-gray-700 hover:text-blue-400 transition"
                            >
                                Identifikohu
                            </Link>

                            <Link
                                href="/register"
                                className="px-4 py-1.5 bg-blue-400 text-white rounded-md hover:bg-blue-600 transition shadow-sm"
                            >
                                Regjistrohu
                            </Link>
                        </div>
                    )}
                    {role !== 'guest' && (
                        <Link href="/logout" method="post" as="button">
                            Dil
                        </Link>
                    )}
                    {role === 'individual' && (
                       <div>

                       </div>
                    )}
                    {role === 'agency' && (
                       <div>

                       </div>
                    )}

                    {role === 'bank' && (
                        <div>

                        </div>
                    )}

                    {role === 'user' && (
                        <div>

                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
