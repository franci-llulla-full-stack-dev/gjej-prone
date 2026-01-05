import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="container mx-auto px-6 py-10">

                {/* Top Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-8">

                    {/* Brand */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Gjej-Prone.com</h2>
                        <p className="text-gray-600 text-sm mt-2 max-w-xs">
                            Platforma #1 në Shqipëri për shitje dhe qira pronash.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Kontakt</h3>
                        <p className="text-gray-600 text-sm">📞 +355 68 123 4567</p>
                        <p className="text-gray-600 text-sm">✉️ info@gjejprone.al</p>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Na Ndiqni</h3>
                        <div className="flex space-x-4 text-gray-600">

                            {/* Instagram */}
                            <a href="#" className="hover:text-blue-600 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                          d="M7 4h10a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3z" />
                                    <circle cx="12" cy="12" r="3.5" strokeWidth="1.5" stroke="currentColor" fill="none" />
                                </svg>
                            </a>

                            {/* TikTok */}
                            <a href="#" className="hover:text-blue-600 transition">
                                <svg viewBox="0 0 48 48" width="25" height="25" fill="currentColor">
                                    <path d="M39 13.5c-2.3-.1-4.5-1-6.2-2.6-1.7-1.7-2.6-3.8-2.6-6.2h-5.5v28c0 3-2.5 5.5-5.5 5.5s-5.5-2.5-5.5-5.5 2.5-5.5 5.5-5.5c1 0 2 .3 2.8.8V22c-.9-.2-1.8-.3-2.8-.3-6 0-11 5-11 11.3S10.8 44 16.8 44c6.3 0 11.3-5 11.3-11.3V16.8c1.8 1.8 4.3 2.9 7 2.9v-6.2z"/>
                                </svg>
                            </a>

                            {/* Facebook */}
                            <a href="#" className="hover:text-blue-600 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor"
                                     viewBox="0 0 24 24">
                                    <path d="M13 3h4V0h-4a5 5 0 00-5 5v3H5v4h3v12h4V12h3.5l.5-4H12V5a2 2 0 012-2z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom */}
                <div className="border-t border-gray-200 mt-8 pt-4 text-center text-gray-500 text-sm">
                    © 2025 gjej-prone.com — Të gjitha të drejtat e rezervuara.
                </div>

            </div>
        </footer>
    );
};

export default Footer;
