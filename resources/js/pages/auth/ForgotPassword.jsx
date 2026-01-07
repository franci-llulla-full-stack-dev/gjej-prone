import backgroundImage from '../../media/background.jpeg';
import { Link, useForm } from '@inertiajs/react';
import React from 'react';

const ForgotPassword = () => {
    const { data, setData, post, errors } = useForm({
        email: '',
    });
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/forgot-password/mail');
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
                <div className="grid">
                    <main className="">
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
                                <h2 className="text-2xl font-bold mb-6 text-gray-800">Harrova fjalekalimin</h2>

                                {/* Form */}
                                <form className="space-y-4">

                                    <div className="text-left">
                                        <label className="block text-gray-700 mb-1">Email</label>
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

                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                                    >
                                        Dergo Link
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

export default ForgotPassword;
