import { InertiaLink } from '@inertiajs/inertia-react';
import backgroundImage from '../../media/background.jpeg';
import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Header from '../../components/Header.jsx';
import Footer from '../../components/Footer.jsx';

const Login = () => {
    const { data, setData, post, errors } = useForm({
        email: '',
        password: '',
    });
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    const ErrorText = ({ field }) => {
        const err = errors?.[field];
        if (!err) return null;
        // errors sometimes come as array
        const text = Array.isArray(err) ? err.join(' ') : err;
        return <p className="text-red-500 text-sm mt-1">{text}</p>;
    };

    return (
        <div>

            <div className="min-h-screen grid ">
                <Header />
                <div className="grid">
                    <main className="self-center">
                        {/* Background image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${backgroundImage})` }}
                        >
                            <div className="absolute inset-0 bg-black/40"></div> {/* dark overlay for text readability */}
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-6 pt-10 text-center overflow-hidden">
                            <div className="bg-white/90 backdrop-blur-lg px-8 py-12 rounded-2xl shadow-lg w-full max-w-md">
                                <h2 className="text-2xl font-bold mb-6 text-gray-800">Identifikohu</h2>

                                {/* Form */}
                                <form className="space-y-4">

                                    <div className="text-left">
                                        <label className="block text-gray-700 mb-1">Email/Nr.Tel</label>
                                        <input
                                            name="email"
                                            type="email"
                                            placeholder="Shkruaj email/nr.tel"
                                            value={data.name}
                                            onChange={handleChange}
                                            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <ErrorText field="email" />
                                    </div>


                                    <div className="text-left pb-3">
                                        <label className="block text-gray-700 mb-1">Fjalëkalimi</label>
                                        <input
                                            name="password"
                                            type="password"
                                            placeholder="Shkruaj fjalëkalimin"
                                            value={data.name}
                                            onChange={handleChange}
                                            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <ErrorText field="password" />
                                    </div>


                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                                    >
                                        Hyr
                                    </button>
                                    <InertiaLink href={"/forgot-password"}><p className="text-gray-700 underline">Harrova fjalekalimin</p></InertiaLink>
                                </form>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
