import { router, usePage } from '@inertiajs/react';
import React from 'react';

export default function VerifySent() {
    const { auth } = usePage().props;
    return (
        <div className="grid grid-cols-1">
            <div className="bg-gray-100 self py-20 px-4 grid place-items-center">
                <div className="bg-white p-8 shadow-md rounded-lg max-w-md text-center">
                    <h1 className="text-2xl font-bold mb-4">Verifiko Email-in</h1>
                    <p className="text-gray-600 mb-4">
                        Ne kemi derguar nje link verifikimi ne <strong>{auth?.user?.email}</strong>.
                        Ju lutem kontrolloni inbox-in tuaj.
                    </p>

                    <button
                        onClick={() => router.post('/email/resend-verification')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Dergo perseri link verifikimi
                    </button>
                </div>
            </div>
        </div>
    );
}
