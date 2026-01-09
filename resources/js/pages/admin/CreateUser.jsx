import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CakeIcon from '@mui/icons-material/Cake';
import LockIcon from '@mui/icons-material/Lock';
import BadgeIcon from '@mui/icons-material/Badge';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function CreateUser({ roles }) {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone_number: '',
        company_name: '',
        address: '',
        birth_date: '',
        role_id: '2', // Default to regular user
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        router.post('/admin/users', formData, {
            onSuccess: () => {
                Swal.fire({
                    title: 'Sukses!',
                    text: 'Përdoruesi u krijua me sukses.',
                    icon: 'success',
                    confirmButtonColor: '#2563eb',
                    confirmButtonText: 'OK'
                }).then(() => {
                    router.get('/admin/users');
                });
            },
            onError: (errors) => {
                setErrors(errors);
                Swal.fire({
                    title: 'Gabim!',
                    text: 'Ju lutemi kontrolloni të dhënat dhe provoni përsëri.',
                    icon: 'error',
                    confirmButtonColor: '#dc2626',
                    confirmButtonText: 'OK'
                });
            },
            onFinish: () => {
                setIsSubmitting(false);
            }
        });
    };

    const handleCancel = () => {
        router.get('/admin/users');
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            <div className="mb-6">
                <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                    <ArrowBackIcon />
                    <span>Kthehu</span>
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Krijo Përdorues të Ri</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name and Surname */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Emri *
                            </label>
                            <div className="relative">
                                <PersonIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: 20 }} />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        errors.name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Shkruani emrin"
                                />
                            </div>
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mbiemri *
                            </label>
                            <div className="relative">
                                <PersonIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: 20 }} />
                                <input
                                    type="text"
                                    name="surname"
                                    value={formData.surname}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        errors.surname ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Shkruani mbiemrin"
                                />
                            </div>
                            {errors.surname && (
                                <p className="mt-1 text-sm text-red-600">{errors.surname}</p>
                            )}
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                        </label>
                        <div className="relative">
                            <EmailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: 20 }} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Shkruani email"
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    {/* Password and Confirmation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Fjalëkalimi *
                            </label>
                            <div className="relative">
                                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: 20 }} />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        errors.password ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Shkruani fjalëkalimin"
                                />
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Konfirmo Fjalëkalimin *
                            </label>
                            <div className="relative">
                                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: 20 }} />
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        errors.password_confirmation ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Konfirmo fjalëkalimin"
                                />
                            </div>
                            {errors.password_confirmation && (
                                <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>
                            )}
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Numri i Telefonit
                        </label>
                        <div className="relative">
                            <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: 20 }} />
                            <input
                                type="text"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.phone_number ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Shkruani numrin e telefonit"
                            />
                        </div>
                        {errors.phone_number && (
                            <p className="mt-1 text-sm text-red-600">{errors.phone_number}</p>
                        )}
                    </div>

                    {/* Company Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Emri i Kompanisë
                        </label>
                        <div className="relative">
                            <BusinessIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: 20 }} />
                            <input
                                type="text"
                                name="company_name"
                                value={formData.company_name}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.company_name ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Shkruani emrin e kompanisë"
                            />
                        </div>
                        {errors.company_name && (
                            <p className="mt-1 text-sm text-red-600">{errors.company_name}</p>
                        )}
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Adresa
                        </label>
                        <div className="relative">
                            <LocationOnIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: 20 }} />
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.address ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Shkruani adresën"
                            />
                        </div>
                        {errors.address && (
                            <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                        )}
                    </div>

                    {/* Birth Date and Role */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Data e Lindjes
                            </label>
                            <div className="relative">
                                <CakeIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: 20 }} />
                                <input
                                    type="date"
                                    name="birth_date"
                                    value={formData.birth_date}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        errors.birth_date ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                            </div>
                            {errors.birth_date && (
                                <p className="mt-1 text-sm text-red-600">{errors.birth_date}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Roli *
                            </label>
                            <div className="relative">
                                <BadgeIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: 20 }} />
                                <select
                                    name="role_id"
                                    value={formData.role_id}
                                    onChange={handleChange}
                                    className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white ${
                                        errors.role_id ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                >
                                    {roles?.map(role => (
                                        <option key={role.id} value={role.id}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {errors.role_id && (
                                <p className="mt-1 text-sm text-red-600">{errors.role_id}</p>
                            )}
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-4 pt-4 border-t border-gray-200">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Duke Krijuar...' : 'Krijo Përdorues'}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                            Anulo
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
