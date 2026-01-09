import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CakeIcon from '@mui/icons-material/Cake';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function UserCard({ user }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const getInitials = (name, surname) => {
        return `${name?.charAt(0) || ''}${surname?.charAt(0) || ''}`.toUpperCase();
    };

    const getRoleColor = (roleId) => {
        const roleColors = {
            1: 'bg-red-100 text-red-800',
            2: 'bg-blue-100 text-blue-800',
            3: 'bg-green-100 text-green-800',
        };
        return roleColors[roleId] || 'bg-gray-100 text-gray-800';
    };

    const handleVerify = async () => {
        const result = await Swal.fire({
            title: 'Verifiko Përdorues',
            text: 'Jeni të sigurt që dëshironi të verifikoni këtë përdorues?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#16a34a',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Po, verifiko',
            cancelButtonText: 'Anulo'
        });

        if (result.isConfirmed) {
            router.put(`/admin/users/${user.id}/verify`);
        }
    };

    const handleEdit = () => {
        router.get(`/admin/users/${user.id}/edit`);
    };

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: 'Fshij Përdorues',
            text: 'Jeni të sigurt që dëshironi të fshini këtë përdorues?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Po, fshije',
            cancelButtonText: 'Anulo'
        });

        if (result.isConfirmed) {
            setIsDeleting(true);
            router.delete(`/admin/users/${user.id}`, {
                onFinish: () => setIsDeleting(false)
            });
        }
    };

    const handleRestore = async () => {
        const result = await Swal.fire({
            title: 'Rikthe Përdorues',
            text: 'Jeni të sigurt që dëshironi të riktheni këtë përdorues?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#16a34a',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Po, riktheje',
            cancelButtonText: 'Anulo'
        });

        if (result.isConfirmed) {
            router.put(`/admin/users/${user.id}/restore`);
        }
    };

    const handlePermanentDelete = async () => {
        const result = await Swal.fire({
            title: 'Fshij Përgjithmonë',
            text: 'Jeni të sigurt që dëshironi të fshini përgjithmonë këtë përdorues? Ky veprim nuk mund të kthehet.',
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#991b1b',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Po, fshije përgjithmonë',
            cancelButtonText: 'Anulo'
        });

        if (result.isConfirmed) {
            setIsDeleting(true);
            router.delete(`/admin/users/${user.id}/force-delete`, {
                onFinish: () => setIsDeleting(false)
            });
        }
    };

    return (
        <div className="max-w-md bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="p-6">
                <div className="flex items-center mb-4">
                    <div className="w-15 h-15 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                        {getInitials(user.name, user.surname)}
                    </div>
                    <div className="ml-4 flex-1">
                        <h3 className="text-xl font-semibold text-gray-800">
                            {user.name} {user.surname}
                        </h3>
                        {user.role && (
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${getRoleColor(user.role_id)}`}>
                                {user.role.name}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    {user.email && (
                        <div className="flex items-center gap-2 text-gray-600">
                            <EmailIcon className="text-gray-400" style={{ fontSize: 20 }} />
                            <span className="text-sm">{user.email}</span>
                        </div>
                    )}

                    {user.phone_number && (
                        <div className="flex items-center gap-2 text-gray-600">
                            <PhoneIcon className="text-gray-400" style={{ fontSize: 20 }} />
                            <span className="text-sm">{user.phone_number}</span>
                        </div>
                    )}

                    {user.company_name && (
                        <div className="flex items-center gap-2 text-gray-600">
                            <BusinessIcon className="text-gray-400" style={{ fontSize: 20 }} />
                            <span className="text-sm">{user.company_name}</span>
                        </div>
                    )}

                    {user.address && (
                        <div className="flex items-center gap-2 text-gray-600">
                            <LocationOnIcon className="text-gray-400" style={{ fontSize: 20 }} />
                            <span className="text-sm">{user.address}</span>
                        </div>
                    )}

                    {user.birth_date && (
                        <div className="flex items-center gap-2 text-gray-600">
                            <CakeIcon className="text-gray-400" style={{ fontSize: 20 }} />
                            <span className="text-sm">
                                {new Date(user.birth_date).toLocaleDateString('sq-AL')}
                            </span>
                        </div>
                    )}
                </div>

                {user.email_verified_at && (
                    <div className="mt-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 border border-green-300 text-green-700 rounded-full text-xs font-medium">
                            <VerifiedIcon style={{ fontSize: 16 }} />
                            Email i Verifikuar
                        </span>
                    </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-200">
                    {!user.deleted_at ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {!user.email_verified_at && (
                                <button
                                    onClick={handleVerify}
                                    className="flex items-center justify-center gap-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                                >
                                    <VerifiedIcon style={{ fontSize: 18 }} />
                                    <span className="hidden md:inline">Verifiko</span>
                                </button>
                            )}
                            <button
                                onClick={handleEdit}
                                className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                            >
                                <EditIcon style={{ fontSize: 18 }} />
                                <span className="hidden md:inline">Ndrysho</span>
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex items-center justify-center gap-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium disabled:bg-gray-400"
                            >
                                <DeleteIcon style={{ fontSize: 18 }} />
                                <span className="hidden md:inline">Fshij</span>
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={handleRestore}
                                className="flex items-center justify-center gap-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                            >
                                <RestoreIcon style={{ fontSize: 18 }} />
                                <span className="hidden md:inline">Rikthe</span>
                            </button>
                            <button
                                onClick={handlePermanentDelete}
                                disabled={isDeleting}
                                className="flex items-center justify-center gap-1 px-3 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors text-sm font-medium disabled:bg-gray-400"
                            >
                                <DeleteForeverIcon style={{ fontSize: 18 }} />
                                <span className="hidden md:inline">Fshij Përgjithmonë</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
