import React from 'react';
import { router } from '@inertiajs/react';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CakeIcon from '@mui/icons-material/Cake';
import VerifiedIcon from '@mui/icons-material/Verified';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MapIcon from '@mui/icons-material/Map';
import LanguageIcon from '@mui/icons-material/Language';
import DescriptionIcon from '@mui/icons-material/Description';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function ViewUser({ user }) {
    const getInitials = (name, surname) => {
        return `${name?.charAt(0) || ''}${surname?.charAt(0) || ''}`.toUpperCase();
    };

    const InfoRow = ({ icon: Icon, label, value, color = "text-gray-400" }) => {
        if (!value && value !== 0) return null;
        return (
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Icon className={color} style={{ fontSize: 24 }} />
                <div className="flex-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
                    <p className="text-base text-gray-800 mt-1">{value}</p>
                </div>
            </div>
        );
    };

    const Section = ({ title, children }) => (
        <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">{title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {children}
            </div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-white text-blue-600 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg">
                            {getInitials(user.name, user.surname)}
                        </div>
                        <div className="text-white">
                            <h1 className="text-3xl font-bold">{user.name} {user.surname}</h1>
                            <div className="flex items-center gap-3 mt-2">
                                {user.role && (
                                    <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
                                        {user.role.name}
                                    </span>
                                )}
                                {user.email_verified_at && (
                                    <span className="flex items-center gap-1 bg-green-500/20 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
                                        <VerifiedIcon style={{ fontSize: 16 }} />
                                        E Verifikuar
                                    </span>
                                )}
                                {user.notifications && (
                                    <span className="flex items-center gap-1 bg-blue-500/20 backdrop-blur px-3 py-1 rounded-full text-sm font-medium">
                                        <NotificationsIcon style={{ fontSize: 16 }} />
                                        Njoftime Aktive
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Informacione Bazë */}
                    <Section title="Informacione Bazë">
                        <InfoRow icon={EmailIcon} label="Email" value={user.email} color="text-blue-500" />
                        <InfoRow icon={PhoneIcon} label="Numri i Telefonit" value={user.phone_number} color="text-green-500" />
                        <InfoRow icon={CakeIcon} label="Datëlindja" value={user.birth_date} color="text-pink-500" />
                        <InfoRow icon={LocationOnIcon} label="Adresa" value={user.address} color="text-red-500" />
                    </Section>

                    {/* Company Information for Agency, Bank, Developer */}
                    {['agency', 'bank', 'developer'].includes(user.role?.name) && (
                        <Section title={user.role?.name === 'bank' ? 'Informacione të Bankës' : user.role?.name === 'agency' ? 'Informacione të Agjencisë' : 'Informacione të Kompanisë'}>
                            <InfoRow icon={BusinessIcon} label={user.role?.name === 'bank' ? 'Emri i Bankës' : user.role?.name === 'agency' ? 'Emri i Agjencisë' : 'Emri i Kompanisë'} value={user.company_name} color="text-purple-500" />
                            <InfoRow icon={BadgeIcon} label="NIPT" value={user.nipt} color="text-indigo-500" />
                            {user.role?.name === 'agency' && (
                                <>
                                    <InfoRow icon={PhoneIcon} label="Numri i Telefonit të Agjencisë" value={user.company_phone_number} color="text-teal-500" />
                                    <InfoRow icon={LanguageIcon} label="Faqja Zyrtare" value={user.website} color="text-cyan-500" />
                                </>
                            )}
                            {user.role?.name === 'developer' && (
                                <>
                                    <InfoRow icon={WorkIcon} label="Vitet e Përvojës" value={user.years_experience} color="text-orange-500" />
                                    <InfoRow icon={BadgeIcon} label="Projekte të Përfunduara" value={user.finished_projects} color="text-amber-500" />
                                </>
                            )}
                            {user.company_description && (
                                <div className="md:col-span-2">
                                    <InfoRow icon={DescriptionIcon} label="Përshkrimi" value={user.company_description} color="text-gray-500" />
                                </div>
                            )}
                            {user.logo_path && (
                                <div className="md:col-span-2 flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Logo</p>
                                    <img src={`/storage/${user.logo_path}`} alt="Logo" className="h-20 w-20 object-cover rounded border shadow" />
                                </div>
                            )}
                        </Section>
                    )}

                    {/* Investor Information */}
                    {user.role?.name === 'investor' && (
                        <Section title="Informacione të Investitorit">
                            <InfoRow icon={AttachMoneyIcon} label="Buxheti Vjetor (€)" value={user.year_budget ? `€${Number(user.year_budget).toLocaleString()}` : null} color="text-green-600" />
                            <InfoRow icon={MapIcon} label="Zonat e Preferuara" value={user.preferred_locations} color="text-blue-600" />
                        </Section>
                    )}

                    {/* Business Information */}
                    {user.role?.name === 'business' && (
                        <Section title="Informacione të Biznesit">
                            <InfoRow icon={BusinessIcon} label="Emri i Kompanisë" value={user.company_name} color="text-purple-500" />
                            <InfoRow icon={MapIcon} label="Zonat e Preferuara për Hapësira Komerciale" value={user.preferred_locations} color="text-blue-600" />
                        </Section>
                    )}

                    {/* Statistics */}
                    <Section title="Statistika">
                        <InfoRow icon={PersonIcon} label="ID" value={user.id} color="text-gray-400" />
                        <InfoRow icon={CakeIcon} label="Krijuar më" value={new Date(user.created_at).toLocaleDateString('sq-AL')} color="text-gray-400" />
                        {user.email_verified_at && (
                            <InfoRow icon={VerifiedIcon} label="Verifikuar më" value={new Date(user.email_verified_at).toLocaleDateString('sq-AL')} color="text-green-500" />
                        )}
                        {user.deleted_at && (
                            <InfoRow icon={PersonIcon} label="Fshirë më" value={new Date(user.deleted_at).toLocaleDateString('sq-AL')} color="text-red-500" />
                        )}
                    </Section>

                    {/* Actions */}
                    <div className="mt-6 flex gap-3">
                        <button
                            onClick={() => router.get('/admin/users')}
                            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                        >
                            Kthehu Mbrapa
                        </button>
                        <button
                            onClick={() => router.get(`/admin/users/${user.id}/edit`)}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Ndrysho
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
