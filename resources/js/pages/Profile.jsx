import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { useForm } from '@inertiajs/react';
import React from 'react';
import Swal from 'sweetalert2';
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
        // Company/Agency fields
        nipt: user.nipt || '',
        company_phone_number: user.company_phone_number || '',
        years_experience: user.years_experience || '',
        company_description: user.company_description || '',
        logo_path: user.logo_path || '',
        // Developer fields
        finished_projects: user.finished_projects || 0,
        website: user.website || '',
        // Investor/Business fields
        year_budget: user.year_budget || '',
        preferred_locations: user.preferred_locations || '',
        logo: null, // for file upload
    });
    const profileData = profileForm.data;
    const handleChangeProfile = (e) => {
        const { name, type, checked, value } = e.target;
        profileForm.setData(name, type === 'checkbox' ? checked : value);
    };

    const handleSubmitProfile = (e) => {
        e.preventDefault();
        profileForm.post('/profile/update', {
            forceFormData: true,
            _method: 'put'
        });
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

    const handleDeleteAccount = () => {
        Swal.fire({
            title: 'Jeni i sigurt?',
            text: 'Fshirja e llogarisë tuaj mund të zgjasë deri në 7 ditë. Ky veprim nuk mund të zhbëhet!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Po, fshije llogarinë!',
            cancelButtonText: 'Anulo',
        }).then((result) => {
            if (result.isConfirmed) {
                // Send delete request
                profileForm.delete('/delete-account', {
                    onSuccess: () => {
                        Swal.fire(
                            'Fshirë!',
                            'Llogaria juaj është shënuar për fshirje.',
                            'success'
                        );
                    },
                });
            }
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

                        {/* Agency/Developer/Bank specific fields */}
                        {['agency', 'developer', 'bank'].includes(user.role?.name) && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">NIPT</label>
                                    <input
                                        type="text"
                                        name="nipt"
                                        value={profileData.nipt}
                                        onChange={handleChangeProfile}
                                        className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    {profileForm.errors.nipt && <p className="text-red-500 text-sm">{profileForm.errors.nipt}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Numri i Kompanisë/Agjencisë</label>
                                    <input
                                        type="text"
                                        name="company_phone_number"
                                        value={profileData.company_phone_number}
                                        onChange={handleChangeProfile}
                                        className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    {profileForm.errors.company_phone_number && <p className="text-red-500 text-sm">{profileForm.errors.company_phone_number}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Vitet e Përvojës</label>
                                    <input
                                        type="number"
                                        name="years_experience"
                                        value={profileData.years_experience}
                                        onChange={handleChangeProfile}
                                        className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    {profileForm.errors.years_experience && <p className="text-red-500 text-sm">{profileForm.errors.years_experience}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Logo e Kompanisë</label>
                                    {profileData.logo_path && (
                                        <div className="mt-2 mb-2">
                                            <img src={`/storage/${profileData.logo_path}`} alt="Logo" className="h-20 w-20 object-cover rounded border" />
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                profileForm.setData('logo', file);
                                            }
                                        }}
                                        className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    {profileForm.errors.logo && <p className="text-red-500 text-sm">{profileForm.errors.logo}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Përshkrim i Kompanisë</label>
                                    <textarea
                                        name="company_description"
                                        value={profileData.company_description}
                                        onChange={handleChangeProfile}
                                        rows="3"
                                        className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    {profileForm.errors.company_description && <p className="text-red-500 text-sm">{profileForm.errors.company_description}</p>}
                                </div>
                            </>
                        )}

                        {/* Developer specific fields */}
                        {user.role?.name === 'developer' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Numri i Projekteve të Përfunduara</label>
                                    <input
                                        type="number"
                                        name="finished_projects"
                                        value={profileData.finished_projects}
                                        onChange={handleChangeProfile}
                                        className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    {profileForm.errors.finished_projects && <p className="text-red-500 text-sm">{profileForm.errors.finished_projects}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Faqja Zyrtare (Website)</label>
                                    <input
                                        type="url"
                                        name="website"
                                        value={profileData.website}
                                        onChange={handleChangeProfile}
                                        placeholder="https://example.com"
                                        className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    {profileForm.errors.website && <p className="text-red-500 text-sm">{profileForm.errors.website}</p>}
                                </div>
                            </>
                        )}

                        {/* Investor specific fields */}
                        {user.role?.name === 'investor' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Buxheti i Përafërt Vjetor (€)</label>
                                    <input
                                        type="number"
                                        name="year_budget"
                                        value={profileData.year_budget}
                                        onChange={handleChangeProfile}
                                        placeholder="100000"
                                        className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    {profileForm.errors.year_budget && <p className="text-red-500 text-sm">{profileForm.errors.year_budget}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Zonat e Preferuara</label>
                                    <input
                                        type="text"
                                        name="preferred_locations"
                                        value={profileData.preferred_locations}
                                        onChange={handleChangeProfile}
                                        placeholder="Tiranë, Durrës, Vlorë"
                                        className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    {profileForm.errors.preferred_locations && <p className="text-red-500 text-sm">{profileForm.errors.preferred_locations}</p>}
                                </div>
                            </>
                        )}

                        {/* Business specific fields */}
                        {user.role?.name === 'business' && (
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Zonat e Preferuara për Hapësira Komerciale</label>
                                <input
                                    type="text"
                                    name="preferred_locations"
                                    value={profileData.preferred_locations}
                                    onChange={handleChangeProfile}
                                    placeholder="Tiranë, Durrës, Vlorë"
                                    className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                {profileForm.errors.preferred_locations && <p className="text-red-500 text-sm">{profileForm.errors.preferred_locations}</p>}
                            </div>
                        )}
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

            <button
                type="button"
                onClick={handleDeleteAccount}
                className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
                Fshij Llogarinë
            </button>
            </div>
    );
};

export default Profile;
