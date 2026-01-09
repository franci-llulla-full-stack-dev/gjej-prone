import React, { useState } from 'react';
import { router, Link } from '@inertiajs/react';
import UserCard from '../../components/UserCard';
import VerifiedIcon from '@mui/icons-material/Verified';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function Users({ users, pagination, filters, roles }) {
    const [activeTab, setActiveTab] = useState(filters.show_deleted || 'active');
    const [selectedRole, setSelectedRole] = useState(filters.role_id || '');
    const [verificationStatus, setVerificationStatus] = useState(filters.verified || '');
    const [searchQuery, setSearchQuery] = useState(filters.search || '');

    const handleTabChange = (newValue) => {
        setActiveTab(newValue);
        router.get('/admin/users', {
            status: newValue,
            role_id: selectedRole,
            verified: verificationStatus,
            search: searchQuery
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const handleRoleChange = (event) => {
        const value = event.target.value;
        setSelectedRole(value);
        router.get('/admin/users', {
            status: activeTab,
            role_id: value,
            verified: verificationStatus,
            search: searchQuery
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const handleVerificationChange = (event) => {
        const value = event.target.value;
        setVerificationStatus(value);
        router.get('/admin/users', {
            status: activeTab,
            role_id: selectedRole,
            verified: value,
            search: searchQuery
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchQuery(value);

        const timeoutId = setTimeout(() => {
            router.get('/admin/users', {
                status: activeTab,
                role_id: selectedRole,
                verified: verificationStatus,
                search: value
            }, {
                preserveState: true,
                preserveScroll: true
            });
        }, 500);

        return () => clearTimeout(timeoutId);
    };

    const handlePageChange = (url) => {
        if (url) {
            router.get(url, {}, {
                preserveState: true,
                preserveScroll: true
            });
        }
    };

    return (
        <div className="w-full">
            <div className="bg-white rounded-lg shadow-md mb-6">
                <div className="flex border-b border-gray-200">
                    <button
                        onClick={() => handleTabChange('active')}
                        className={`flex items-center gap-2 px-6 py-4 text-base font-medium transition-colors ${
                            activeTab === 'active'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-800'
                        }`}
                    >
                        <PeopleIcon />
                        <span>Aktivë</span>
                    </button>
                    <button
                        onClick={() => handleTabChange('deleted')}
                        className={`flex items-center gap-2 px-6 py-4 text-base font-medium transition-colors ${
                            activeTab === 'deleted'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-800'
                        }`}
                    >
                        <DeleteIcon />
                        <span>Përdorues të Fshirë</span>
                    </button>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Kërkoni përdorues..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <select
                                value={selectedRole}
                                onChange={handleRoleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                            >
                                <option value="">Të gjithë rolet</option>
                                {roles?.map(role => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <select
                                value={verificationStatus}
                                onChange={handleVerificationChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                            >
                                <option value="">Të gjithë</option>
                                <option value="verified">Të Verifikuar</option>
                                <option value="unverified">Të Paverifikuar</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <Link className="bg-blue-500 hover:bg-blue-700 mb-4 text-white font-bold py-2 px-4 rounded" href="/admin/users/create">
                Shto përdorues
            </Link>
            {pagination?.total > 0 && (
                <div className="my-4 text-gray-600">
                    <p className="text-sm">
                        Gjithsej: <span className="font-semibold">{pagination.total}</span> përdorues
                    </p>
                </div>
            )}

            {users.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
                    {users.map(user => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <h3 className="text-lg font-semibold text-gray-600">
                        Nuk u gjetën përdorues
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">
                        Provoni të ndryshoni filtrat për të parë më shumë rezultate
                    </p>
                </div>
            )}

            {pagination?.last_page > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                    <button
                        onClick={() => handlePageChange(pagination.prev_page_url)}
                        disabled={!pagination.prev_page_url}
                        className={`flex items-center justify-center w-10 h-10 rounded-md border ${
                            pagination.prev_page_url
                                ? 'border-gray-300 hover:bg-gray-50 text-gray-700'
                                : 'border-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        <ChevronLeftIcon />
                    </button>

                    {pagination.links?.slice(1, -1).map((link, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(link.url)}
                            className={`w-10 h-10 rounded-md border ${
                                link.active
                                    ? 'bg-blue-600 border-blue-600 text-white'
                                    : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                            }`}
                        >
                            {link.label}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(pagination.next_page_url)}
                        disabled={!pagination.next_page_url}
                        className={`flex items-center justify-center w-10 h-10 rounded-md border ${
                            pagination.next_page_url
                                ? 'border-gray-300 hover:bg-gray-50 text-gray-700'
                                : 'border-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        <ChevronRightIcon />
                    </button>
                </div>
            )}
        </div>
    );
}

export default Users;
