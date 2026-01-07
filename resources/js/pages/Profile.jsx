import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { useForm } from '@inertiajs/react';
import React from 'react';

const Profile = ({ user }) => {

    const profileForm = useForm({
        name: user.name || '',
        surname: user.surname || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        company_name: user.company_name || '',
        birth_date: user.birth_date || '',
        address: user.address || '',
        notifications: user.notifications ?? true,
    });
    const profileData = profileForm.data;
    const handleChangeProfile = (e) => {
        const { name, type, checked, value } = e.target;
        profileForm.setData(name, type === 'checkbox' ? checked : value);
    };

    const handleSubmitProfile = (e) => {
        e.preventDefault();
        profileForm.put('/profile/update');
    };

    const passwordForm = useForm({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    });
    const passwordData = passwordForm.data;
    const handleChangePassword = (e) => {
        const { name, type, checked, value } = e.target;
        passwordForm.setData(name, type === 'checkbox' ? checked : value);
    };

    const handleSubmitPassword = (e) => {
        e.preventDefault();
        passwordForm.put('/profile/password/update', {
            onFinish: () => {
                passwordForm.reset('current_password',
                    'new_password',
                    'new_password_confirmation');
            },
        });
    };
    return (
        <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Profili im</h1>

                <form onSubmit={handleSubmitProfile} className="space-y-4">
                    {/* Personal Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Emri</label>
                            <input
                                type="text"
                                name="name"
                                value={profileData.name}
                                onChange={handleChangeProfile}
                                className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {profileForm.errors.name && <p className="text-red-500 text-sm">{profileForm.errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mbiemri</label>
                            <input
                                type="text"
                                name="surname"
                                value={profileData.surname}
                                onChange={handleChangeProfile}
                                className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {profileForm.errors.surname && <p className="text-red-500 text-sm">{profileForm.errors.surname}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="text"
                                name="email"
                                value={profileData.email}
                                onChange={handleChangeProfile}
                                className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {profileForm.errors.email && <p className="text-red-500 text-sm">{profileForm.errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Numri i telefonit</label>
                            <input
                                type="tel"
                                name="phone_number"
                                value={profileData.phone_number}
                                onChange={handleChangeProfile}
                                className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {profileForm.errors.phone_number && <p className="text-red-500 text-sm">{profileForm.errors.phone_number}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Data e lindjes</label>
                            <input
                                type="date"
                                name="birth_date"
                                value={profileData.birth_date}
                                onChange={handleChangeProfile}
                                className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {profileForm.errors.birth_date && <p className="text-red-500 text-sm">{profileForm.errors.birth_date}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Adresa</label>
                            <input
                                type="text"
                                name="address"
                                value={profileData.address}
                                onChange={handleChangeProfile}
                                className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {profileForm.errors.address && <p className="text-red-500 text-sm">{profileForm.errors.address}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Emri i kompanisë (opsionale)</label>
                            <input
                                type="text"
                                name="company_name"
                                value={profileData.company_name}
                                onChange={handleChangeProfile}
                                className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {profileForm.errors.company_name && <p className="text-red-500 text-sm">{profileForm.errors.company_name}</p>}
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="notifications"
                            checked={profileData.notifications}
                            onChange={handleChangeProfile}
                            className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                        />
                        <label className="text-sm text-gray-700">Dua të marr njoftime me email</label>
                    </div>


                    <button
                        type="submit"
                        disabled={profileForm.processing}
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Ruaj Ndryshimet
                    </button>
                </form>
                <form onSubmit={handleSubmitPassword} className="space-y-4">
                <div className="mt-4 border-t pt-4 space-y-3">
                    <h3 className="text-lg font-semibold">Ndrysho fjalëkalimin</h3>
                    <input
                        type="password"
                        name="current_password"
                        value={passwordData.current_password}
                        onChange={handleChangePassword}
                        placeholder="Fjalëkalimi aktual"
                        className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {passwordForm.errors.current_password && <p className="text-red-500 text-sm">{passwordForm.errors.current_password}</p>}

                    <input
                        type="password"
                        name="new_password"
                        value={passwordData.new_password}
                        onChange={handleChangePassword}
                        placeholder="Fjalëkalimi i ri"
                        className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {passwordForm.errors.new_password && <p className="text-red-500 text-sm">{passwordForm.errors.new_password}</p>}

                    <input
                        type="password"
                        name="new_password_confirmation"
                        value={passwordData.new_password_confirmation}
                        onChange={handleChangePassword}
                        placeholder="Konfirmo fjalëkalimin e ri"
                        className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    type="submit"
                    disabled={passwordForm.processing}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Ruaj Ndryshimet
                </button>
            </form>
            </div>
    );
};

export default Profile;
