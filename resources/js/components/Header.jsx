import backgroundImage from '../media/background.jpeg';
import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

const Header = () => {
    const { auth } = usePage().props;
    const role = auth?.user?.role || 'guest';
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-white/90 backdrop-blur shadow-sm fixed top-0 w-full z-50">
            <div className="container mx-auto px-2 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center">
                    <img src="/logo-2.png" alt="Logo" className="h-10 w-auto mr-2" />
                    <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight text-gray-900">
                        Gjej<span className="text-blue-400">Prone</span>.al
                    </h1>
                </Link>

                {/* Desktop menu */}
                <nav className="hidden sm:flex items-center gap-4 text-sm sm:text-base">
                    {role === 'guest' && (
                        <>
                            <Link
                                href="/login"
                                className="px-2 py-1.5 text-gray-700 hover:text-blue-400 transition"
                            >
                                Identifikohu
                            </Link>
                            <Link
                                href="/register"
                                className="px-4 py-1.5 bg-blue-400 text-white rounded-md hover:bg-blue-600 transition shadow-sm"
                            >
                                Regjistrohu
                            </Link>
                        </>
                    )}
                    {role !== 'guest' && (
                        <Link href="/logout" method="post" as="button">
                            Dil
                        </Link>
                    )}
                </nav>
                {role === 'guest' && (
                    <div className="sm:hidden">
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
                {/* Mobile hamburger */}
                {role !== 'guest' && (
                    <button
                        className="md:hidden flex items-center px-3 py-2 border rounded text-gray-700 border-gray-400 hover:text-blue-400 hover:border-blue-400"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6 in-aria-expanded:hidden">
                            {menuOpen ? (
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                />
                            ) : (
                                <path
                                    fillRule="evenodd"
                                    d="M3 5h14M3 10h14M3 15h14"
                                    clipRule="evenodd"
                                />
                            )}
                        </svg>
                    </button>
                )}
            </div>

            {/* Mobile menu dropdown */}
            {menuOpen && (
                <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            href="/dashboard"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/admin/properties"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50"
                        >
                            Pronat
                        </Link>
                        <Link
                            href="/dashboard"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50"
                        >
                            Users
                        </Link>
                        <Link
                            href="/dashboard"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50"
                        >
                            Logs
                        </Link>
                        <Link
                            href="/profile"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50"
                        >
                            Profile
                        </Link>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-400 hover:bg-gray-50"
                        >
                            Dil
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
