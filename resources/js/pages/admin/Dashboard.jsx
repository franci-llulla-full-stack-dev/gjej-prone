import React, { useState, useEffect } from 'react';
import Header from '../../components/Header.jsx';
import Footer from '../../components/Footer.jsx';

const Dashboard = () => {
    // Fake stats
    const statsData = [
        { label: 'Users', value: 1250 },
        { label: 'Properties Listed', value: 342 },
        { label: 'Sellers', value: 87 },
    ];

    // States for animated counters
    const [counts, setCounts] = useState(statsData.map(() => 0));

    useEffect(() => {
        const intervals = statsData.map((stat, index) => {
            const increment = Math.ceil(stat.value / 50); // speed of animation
            return setInterval(() => {
                setCounts(prev => {
                    const newCounts = [...prev];
                    if (newCounts[index] < stat.value) {
                        newCounts[index] = Math.min(newCounts[index] + increment, stat.value);
                    }
                    return newCounts;
                });
            }, 30);
        });

        return () => intervals.forEach(clearInterval);
    }, []);

    return (
        <div className="pt-20 min-h-screen bg-gray-50">
            <main className="pb-10 px-4 md:px-10">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {statsData.map((stat, index) => (
                        <div
                            key={stat.label}
                            className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center transform transition hover:scale-105"
                        >
                            <p className="text-gray-500 text-sm">{stat.label}</p>
                            <p className="text-3xl font-bold text-blue-500 mt-2">
                                {counts[index].toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
