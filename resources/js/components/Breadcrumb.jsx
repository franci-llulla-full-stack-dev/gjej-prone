import React from 'react';
import { Link } from '@inertiajs/react';

export default function Breadcrumb({ items = [] }) {
    return (
        <nav className="bg-gray-300 shadow px-4 py-2 mb-4 rounded">
            <ol className="flex space-x-2 text-gray-700 text-sm">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        {index !== 0 && <span className="mx-2">/</span>}
                        {item.href ? (
                            <Link href={item.href} className="hover:underline">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="font-semibold">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
