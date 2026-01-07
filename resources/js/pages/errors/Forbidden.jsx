import React from "react";
import { Link } from "@inertiajs/react";

export default function Forbidden() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-6">
            <h1 className="text-7xl font-bold text-red-600">403</h1>
            <h2 className="text-2xl font-semibold mt-4">Akses i Ndaluar</h2>
            <p className="text-gray-600 mt-2 max-w-md">
                Nuk keni leje për të aksesuar këtë faqe.
            </p>

            <Link
                href="/"
                className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
                Kthehu Mbrapa
            </Link>
        </div>
    );
}
