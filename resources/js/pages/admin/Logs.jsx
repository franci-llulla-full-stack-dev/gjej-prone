import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DescriptionIcon from '@mui/icons-material/Description';
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function Logs({ logs, pagination, filters, users, action_types }) {
    const [perPage, setPerPage] = useState(filters.per_page || 10);
    const [selectedUser, setSelectedUser] = useState(filters.user_id || '');
    const [selectedAction, setSelectedAction] = useState(filters.action_type || '');

    const handleFilter = (filterData) => {
        router.get('/admin/logs', filterData, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handlePerPageChange = (e) => {
        const newPerPage = e.target.value;
        setPerPage(newPerPage);
        handleFilter({ ...filters, per_page: newPerPage });
    };

    const handleUserChange = (e) => {
        const userId = e.target.value;
        setSelectedUser(userId);
        handleFilter({ ...filters, user_id: userId, page: 1 });
    };

    const handleActionChange = (e) => {
        const action = e.target.value;
        setSelectedAction(action);
        handleFilter({ ...filters, action_type: action, page: 1 });
    };

    const clearFilters = () => {
        setSelectedUser('');
        setSelectedAction('');
        router.get('/admin/logs');
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('sq-AL', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getActionColor = (action) => {
        const colors = {
            'created': 'bg-green-100 text-green-800',
            'updated': 'bg-blue-100 text-blue-800',
            'deleted': 'bg-red-100 text-red-800',
            'viewed': 'bg-gray-100 text-gray-800',
            'login': 'bg-purple-100 text-purple-800',
            'logout': 'bg-orange-100 text-orange-800',
        };
        return colors[action?.toLowerCase()] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="w-full p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Historiku i Aktiviteteve</h1>
                <p className="text-gray-600 mt-2">Shikoni të gjitha aktivitetet e përdoruesve</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <FilterListIcon className="text-gray-600" />
                    <h2 className="text-lg font-semibold text-gray-800">Filtro</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Përdoruesi
                        </label>
                        <select
                            value={selectedUser}
                            onChange={handleUserChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Të gjithë</option>
                            {users?.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.name} {user.surname}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lloji i Veprimit
                        </label>
                        <select
                            value={selectedAction}
                            onChange={handleActionChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Të gjitha</option>
                            {action_types?.map(action => (
                                <option key={action} value={action}>
                                    {action}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rreshta për faqe
                        </label>
                        <select
                            value={perPage}
                            onChange={handlePerPageChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>

                    <div className="flex items-end">
                        <button
                            onClick={clearFilters}
                            className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                        >
                            Pastro Filtrat
                        </button>
                    </div>
                </div>
            </div>

            {/* Logs Cards */}
            <div className="space-y-4 mb-6">
                {logs?.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                        <p className="text-gray-500">Nuk ka aktivitete për të shfaqur</p>
                    </div>
                ) : (
                    logs?.map(log => (
                        <div key={log.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                {/* Left Section */}
                                <div className="flex-1 space-y-3">
                                    {/* User and Action */}
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <div className="flex items-center gap-2">
                                            <PersonIcon className="text-gray-600" style={{ fontSize: 20 }} />
                                            <span className="font-medium text-gray-800">
                                                {log.user?.name} {log.user?.surname}
                                            </span>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getActionColor(log.action_type)}`}>
                                            {log.action_type}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    {log.description && (
                                        <div className="flex items-start gap-2">
                                            <DescriptionIcon className="text-gray-500 mt-0.5" style={{ fontSize: 18 }} />
                                            <p className="text-gray-700">{log.description}</p>
                                        </div>
                                    )}

                                    {/* Related Property or Request */}
                                    <div className="flex flex-wrap gap-4">
                                        {log.property && (
                                            <div
                                                onClick={() => router.get(`/properties/${log.property.id}`)}
                                                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 cursor-pointer transition-colors"
                                            >
                                                <HomeIcon style={{ fontSize: 18 }} />
                                                <span className="underline">Prona: {log.property.city}</span>
                                            </div>
                                        )}
                                        {log.property_request && (
                                            <div
                                                onClick={() => router.get(`/property-requests/${log.property_request.id}`)}
                                                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 cursor-pointer transition-colors"
                                            >
                                                <RequestPageIcon style={{ fontSize: 18 }} />
                                                <span className="underline">Kërkesa: {log.property_request.city}</span>
                                            </div>
                                        )}

                                    </div>
                                </div>

                                {/* Right Section - Date */}
                                <div className="flex items-center gap-2 text-gray-500">
                                    <CalendarTodayIcon style={{ fontSize: 18 }} />
                                    <span className="text-sm">{formatDate(log.created_at)}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {pagination.last_page > 1 && (
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="text-sm text-gray-600">
                            Faqja {pagination.current_page} nga {pagination.last_page}
                            <span className="ml-2">
                                (Totali: {pagination.total})
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleFilter({ ...filters, page: pagination.current_page - 1 })}
                                disabled={!pagination.prev_page_url}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <ChevronLeftIcon />
                                Prapa
                            </button>

                            <div className="flex gap-1">
                                {pagination.links?.filter(link => !link.label.includes('Previous') && !link.label.includes('Next')).map((link, index) => (
                                    <button
                                        key={index}
                                        onClick={() => link.url && handleFilter({ ...filters, page: link.label })}
                                        className={`px-4 py-2 rounded-md transition-colors ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                        disabled={!link.url || link.active}
                                    >
                                        {link.label}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => handleFilter({ ...filters, page: pagination.current_page + 1 })}
                                disabled={!pagination.next_page_url}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                Para
                                <ChevronRightIcon />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
