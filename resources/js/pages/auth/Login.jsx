// resources/js/pages/auth/Login.jsx
import backgroundImage from '../../media/background.jpeg';
import React from 'react';
import { Link, useForm, Head } from '@inertiajs/react';

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
        const text = Array.isArray(err) ? err.join(' ') : err;
        return <p className="text-red-500 text-sm mt-1">{text}</p>;
    };

    return (
        <div>
            <Head>
                <title>Hyr | Gjej-Prone</title>
                <meta name="description" content="Identifikohu për të menaxhuar pronat dhe për të përfituar nga shërbimet tona." />
            </Head>
            <div className="min-h-screen grid">
                <div className="grid">
                    <main>
                        {/* Background image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${backgroundImage})` }}
                        >
                            <div className="absolute inset-0 bg-black/40"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-6 pt-10 text-center overflow-hidden">
                            <div className="bg-white/90 backdrop-blur-lg px-8 py-12 rounded-2xl shadow-lg w-full max-w-md">
                                <h2 className="text-2xl font-bold mb-6 text-gray-800">Identifikohu</h2>

                                {/* Form */}
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    <div className="text-left">
                                        <label className="block text-gray-700 mb-1">Email/Nr.Tel</label>
                                        <input
                                            name="email"
                                            type="email"
                                            placeholder="Shkruaj email/nr.tel"
                                            value={data.email}
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
                                            value={data.password}
                                            onChange={handleChange}
                                            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <ErrorText field="password" />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                                    >
                                        Hyr
                                    </button>
                                    <div className="mt-6 text-center">
                                        <span className="text-gray-700">Nuk ke llogari? </span>
                                        <Link href="/register" className="text-blue-600 underline font-semibold">
                                            Krijo
                                        </Link>
                                    </div>
                                    <Link href="/forgot-password">
                                        <p className="text-gray-700 underline">Harrova fjalekalimin</p>
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Login;
