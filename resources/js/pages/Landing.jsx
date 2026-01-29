// javascript
import React, { useEffect, useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import backgroundImage from '../media/background.jpeg';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const Landing = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimate(true), 100); // vonesë e vogël për të nisur animacionin
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Head>
                <title>Gjej pronën perfekte në Shqipëri | Gjej-Prone</title>
                <meta name="description" content="Platforma më e mirë për të gjetur, blerë, ose dhënë me qira prona në Shqipëri. Publiko pronën tënde lehtësisht dhe shiko ofertat më të fundit." />
            </Head>
            <div className="relative pb-25">

                {/* Imazhi i sfondit */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                >
                    <div className="absolute inset-0 bg-black/40"></div> {/* mbulesë e errët për lexueshmëri më të mirë */}
                </div>

                {/* Përmbajtja */}
                <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
                    <h2
                        className={`text-2xl md:text-5xl font-bold text-white mb-4 transform transition-all duration-1000 ease-out ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                    >
                        Gjej pronën perfekte në Shqipëri
                    </h2>
                    <p
                        className={`mt-2 text-lg md:text-xl text-white/90 mb-6 max-w-2xl transform transition-all duration-1000 delay-200 ease-out ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                    >
                        Bli, jep me qira ose publiko shtëpinë apo apartamentin tënd. Shpejt, e sigurt dhe e lehtë.
                    </p>
                    <div
                        className={`flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 transform transition-all duration-1000 delay-400 ease-out ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                    >
                        <Link
                            href="/listed-properties"
                            className="px-6 py-3 bg-blue-400 text-white rounded hover:bg-blue-600 transition"
                        >
                            Shiko Pronat
                        </Link>
                        <Link
                            href="/property/requests/all"
                            className="px-6 py-3 border border-white text-white rounded hover:bg-white hover:text-blue-600 transition"
                        >
                            Shiko Kerkesat
                        </Link>
                    </div>
                </div>
            </div>
            <section className="relative z-20 bg-white/90 rounded-lg shadow-lg max-w-3xl mx-auto my-10 p-6 text-gray-900">
                <h2 className="text-2xl font-semibold mb-3 text-blue-700">Platforma më e mirë për prona në Shqipëri</h2>
                <p className="mb-4">
                    Gjej-Prone është platforma kryesore për të gjetur, blerë ose dhënë me qira prona në Shqipëri. Kërkoni apartamente, shtëpi, vila dhe truall në qytete si Tiranë, Durrës, Vlorë, Shkodër dhe më shumë. Me filtrat tanë të avancuar, mund të gjeni pronën ideale sipas çmimit, vendndodhjes dhe tipit të pronës.
                </p>
                <h3 className="text-xl font-semibold mb-2 text-blue-600">Si funksionon?</h3>
                <p className="mb-4">
                    Publikoni pronën tuaj falas ose shikoni ofertat më të fundit të pronave në shitje dhe me qira. Platforma jonë ofron siguri, transparencë dhe mbështetje të dedikuar për çdo përdorues. Qindra pronarë dhe blerës të kënaqur kanë gjetur zgjidhjen e tyre për prona në Shqipëri përmes nesh.
                </p>
                <p className="mb-4">
                    Nëse jeni duke kërkuar prona në shitje apo apartamente me qira në Shqipëri, platforma jonë ju ofron mundësinë të eksploroni oferta të ndryshme nga agjenci imobiliare dhe pronarë të drejtpërdrejtë. Zbuloni shtëpi të reja, vila luksoze, ose prona komerciale në qytete të ndryshme si Elbasan, Fier, Korçë dhe Sarandë. Me ndihmën tonë, procesi i gjetjes së pronës së duhur është më i lehtë dhe më i shpejtë se kurrë më parë.
                </p>
            </section>
        </>
    );
};

export default Landing;
