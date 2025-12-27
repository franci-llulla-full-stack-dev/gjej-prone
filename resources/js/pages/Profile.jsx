import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { useForm } from '@inertiajs/react';
import React from 'react';

const Profile = ({ user }) => {

    const { data, setData, post, processing, errors } = useForm({
        name: user.name || '',
        surname: user.surname || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        company_name: user.company_name || '',
        birth_date: user.birth_date || '',
        address: user.address || '',
        notifications: user.notifications ?? true,
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    });

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setData(name, type === 'checkbox' ? checked : value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/profile/update'); // make sure you have this route
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Profili im</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Personal Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Emri</label>
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mbiemri</label>
                            <input
                                type="text"
                                name="surname"
                                value={data.surname}
                                onChange={handleChange}
                                className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.surname && <p className="text-red-500 text-sm">{errors.surname}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="text"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Numri i telefonit</label>
                            <input
                                type="tel"
                                name="phone_number"
                                value={data.phone_number}
                                onChange={handleChange}
                                className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Data e lindjes</label>
                            <input
                                type="date"
                                name="birth_date"
                                value={data.birth_date}
                                onChange={handleChange}
                                className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.birth_date && <p className="text-red-500 text-sm">{errors.birth_date}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Adresa</label>
                            <input
                                type="text"
                                name="address"
                                value={data.address}
                                onChange={handleChange}
                                className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Emri i kompanisë (opsionale)</label>
                            <input
                                type="text"
                                name="company_name"
                                value={data.company_name}
                                onChange={handleChange}
                                className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.company_name && <p className="text-red-500 text-sm">{errors.company_name}</p>}
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="notifications"
                            checked={data.notifications}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                        />
                        <label className="text-sm text-gray-700">Dua të marr njoftime me email</label>
                    </div>

                    {/* Change Password */}
                    <div className="mt-4 border-t pt-4 space-y-3">
                        <h3 className="text-lg font-semibold">Ndrysho fjalëkalimin</h3>
                        <input
                            type="password"
                            name="current_password"
                            value={data.current_password}
                            onChange={handleChange}
                            placeholder="Fjalëkalimi aktual"
                            className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.current_password && <p className="text-red-500 text-sm">{errors.current_password}</p>}

                        <input
                            type="password"
                            name="new_password"
                            value={data.new_password}
                            onChange={handleChange}
                            placeholder="Fjalëkalimi i ri"
                            className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.new_password && <p className="text-red-500 text-sm">{errors.new_password}</p>}

                        <input
                            type="password"
                            name="new_password_confirmation"
                            value={data.new_password_confirmation}
                            onChange={handleChange}
                            placeholder="Konfirmo fjalëkalimin e ri"
                            className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Ruaj Ndryshimet
                    </button>
                </form>
            </div>
    );
};

export default Profile;
