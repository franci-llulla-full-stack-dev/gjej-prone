import React from 'react';
import { Link } from '@inertiajs/react';

const Pagination = ({ links }) => {
    if (!links || links.length === 0) return null;

    const renderPageLinks = () => {
        const visibleLinks = [];
        const totalLinks = links.length;
        const currentPage = links.findIndex(link => link.active);

        links.forEach((link, index) => {
            if (
                index === 0 || // First page
                index === totalLinks - 1 || // Last page
                (index >= currentPage - 2 && index <= currentPage + 2) // Pages around the current page
            ) {
                visibleLinks.push(
                    <li key={index}>
                        {link.url ? (
                            <Link
                                href={link.url}
                                className={`px-4 py-2 border rounded ${
                                    link.active
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ) : (
                            <span
                                className="px-4 py-2 border rounded text-gray-400"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        )}
                    </li>
                );
            } else if (
                (index === currentPage - 3 || index === currentPage + 3) &&
                !visibleLinks.some(item => item.key === `ellipsis-${index}`)
            ) {
                visibleLinks.push(
                    <li key={`ellipsis-${index}`}>
                        <span className="px-4 py-2 border rounded text-gray-400">...</span>
                    </li>
                );
            }
        });

        return visibleLinks;
    };

    return (
        <nav className="flex justify-center mt-4">
            <ul className="inline-flex items-center space-x-2">
                {renderPageLinks()}
            </ul>
        </nav>
    );
};

export default Pagination;
