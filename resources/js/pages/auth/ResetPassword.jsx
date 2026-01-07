import backgroundImage from '../../media/background.jpeg';
import { useForm } from '@inertiajs/react';
import React, { useEffect } from 'react';

const ResetPassword = ({ token, email }) => {
    const { data, setData, post, processing, errors } = useForm({
        token: token || '',
        email: email || '',
        password: '',
        password_confirmation: '',
    });

    // Ensure email & token are always set
    useEffect(() => {
        setData('email', email);
        setData('token', token);
    }, [email, token]);

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/reset-password', {
            onSuccess: () => setData('password', '', 'password_confirmation', ''),
        });
    };

    const ErrorText = ({ field }) => {
        const err = errors?.[field];
        if (!err) return null;
        const text = Array.isArray(err) ? err.join(' ') : err;
        return <p className="text-red-500 text-sm mt-1">{text}</p>;
    };

    return (
        <div>
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
                                <h2 className="text-2xl font-bold mb-6 text-gray-800">Harrova fjalekalimin</h2>

                                {/* Form */}
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    {/* Hidden Email */}
                                    <input type="hidden" name="email" value={data.email} />
                                    <input type="hidden" name="token" value={data.token} />

                                    {/* Password */}
                                    <div className="text-left">
                                        <label className="block text-gray-700 mb-1">Fjalekalimi i ri</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            onChange={handleChange}
                                            placeholder="Shkruaj fjalekalimin e ri"
                                            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <ErrorText field="password" />
                                    </div>

                                    {/* Password confirmation */}
                                    <div className="text-left">
                                        <label className="block text-gray-700 mb-1">Konfirmo fjalekalimin</label>
                                        <input
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            onChange={handleChange}
                                            placeholder="Konfirmo fjalekalimin"
                                            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <ErrorText field="password_confirmation" />
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                                    >
                                        Ndrysho fjalekalimin
                                    </button>
                                </form>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
