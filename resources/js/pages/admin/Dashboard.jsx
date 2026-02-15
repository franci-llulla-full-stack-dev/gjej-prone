import React, { useState, useEffect } from 'react';

const Dashboard = ({ stats }) => {
    // States for animated counters
    const [animatedStats, setAnimatedStats] = useState({});

    useEffect(() => {
        // Initialize all stats to 0
        const initialStats = {};
        Object.keys(stats).forEach(key => {
            initialStats[key] = 0;
        });
        setAnimatedStats(initialStats);

        // Animate counters
        const duration = 1000; // 1 second animation
        const steps = 50;
        const interval = duration / steps;

        const timer = setInterval(() => {
            setAnimatedStats(prev => {
                const updated = { ...prev };
                let allDone = true;

                Object.keys(stats).forEach(key => {
                    if (updated[key] < stats[key]) {
                        const increment = Math.ceil(stats[key] / steps);
                        updated[key] = Math.min(updated[key] + increment, stats[key]);
                        allDone = false;
                    }
                });

                if (allDone) clearInterval(timer);
                return updated;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [stats]);

    const StatCard = ({ label, value, color = 'blue', icon }) => (
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm mb-1">{label}</p>
                    <p className={`text-3xl font-bold text-${color}-600`}>
                        {(animatedStats[value] || 0).toLocaleString()}
                    </p>
                </div>
                {icon && <div className="text-4xl">{icon}</div>}
            </div>
        </div>
    );

    const SectionTitle = ({ children }) => (
        <h2 className="text-xl font-bold text-gray-800 mb-4 mt-8 border-b-2 border-blue-500 pb-2">
            {children}
        </h2>
    );

    return (
        <div className="pt-20 min-h-screen bg-gray-50">
            <main className="pb-10 px-4 md:px-10 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard - Statistika</h1>

                {/* Overview */}
                <SectionTitle>Përmbledhje</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard label="Gjithsej Përdorues" value="total_users" color="blue" icon="👥" />
                    <StatCard label="Gjithsej Prona" value="total_properties" color="green" icon="🏠" />
                    <StatCard label="Gjithsej Kërkesa" value="total_property_requests" color="purple" icon="📋" />
                </div>

                {/* Users by Type */}
                <SectionTitle>Përdorues sipas Tipit</SectionTitle>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <StatCard label="Blerës" value="users_buyers" color="blue" icon="🛒" />
                    <StatCard label="Investitorë" value="users_investors" color="green" icon="💼" />
                    <StatCard label="Biznes" value="users_business" color="cyan" icon="🏪" />
                    <StatCard label="Individë" value="users_sellers_individual" color="orange" icon="👤" />
                    <StatCard label="Agjenci" value="users_sellers_agency" color="purple" icon="🏢" />
                    <StatCard label="Banka" value="users_sellers_bank" color="red" icon="🏦" />
                    <StatCard label="Zhvillues" value="users_sellers_developer" color="indigo" icon="🏗️" />
                    <StatCard label="Të fundit (7 ditë)" value="users_last_7_days" color="teal" icon="🆕" />
                </div>

                {/* Properties Status */}
                <SectionTitle>Pronat - Statusi</SectionTitle>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard label="E Verifikuara" value="properties_verified" color="green" icon="✅" />
                    <StatCard label="E Paverifikuara" value="properties_unverified" color="yellow" icon="⏳" />
                    <StatCard label="E Shitura" value="properties_sold" color="red" icon="🔴" />
                    <StatCard label="Të Disponueshme" value="properties_available" color="blue" icon="🟢" />
                </div>

                {/* Properties by Type */}
                <SectionTitle>Pronat - Lloji</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard label="Për Shitje" value="properties_for_sale" color="green" icon="💰" />
                    <StatCard label="Për Qira" value="properties_for_rent" color="blue" icon="🔑" />
                    <StatCard label="Të fundit (7 ditë)" value="properties_last_7_days" color="teal" icon="🆕" />
                </div>

                {/* Property Requests */}
                <SectionTitle>Kërkesat e Pronave</SectionTitle>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard label="Aktive" value="property_requests_active" color="blue" icon="🔵" />
                    <StatCard label="Të Perfunduara" value="property_requests_completed" color="green" icon="✅" />
                    <StatCard label="Me Arkitekt" value="property_requests_with_architect" color="purple" icon="🏛️" />
                    <StatCard label="Me Interior Dizajner" value="property_requests_with_interior_design" color="orange" icon="🎨" />
                </div>

                <div className="grid grid-cols-1 gap-6 mt-4">
                    <StatCard label="Kërkesa të fundit (7 ditë)" value="property_requests_last_7_days" color="teal" icon="🆕" />
                </div>

                {/* Services */}
                <SectionTitle>Shërbimet</SectionTitle>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <StatCard label="Tur Virtual (Kërkuar)" value="properties_virtual_tour" color="blue" icon="📹" />
                    <StatCard label="Tur Virtual (Kryer)" value="properties_virtual_tour_done" color="green" icon="✅" />
                    <StatCard label="Rivlerësim (Kërkuar)" value="properties_rivleresim" color="orange" icon="📊" />
                    <StatCard label="Rivlerësim (Kryer)" value="properties_rivleresim_done" color="green" icon="✅" />
                    <StatCard label="Paketat Kombinuara" value="properties_combo_package" color="purple" icon="📦" />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
