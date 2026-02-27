// javascript
import React, { useEffect, useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import backgroundImage from '../media/background.jpeg';

const Landing = () => {
    const [animate, setAnimate] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        // Preload the background image
        const img = new Image();
        img.src = backgroundImage;
        img.onload = () => {
            setImageLoaded(true);
            // Start animation after image loads
            setTimeout(() => setAnimate(true), 100);
        };

        // Fallback in case image takes too long
        const fallbackTimer = setTimeout(() => {
            if (!imageLoaded) {
                setImageLoaded(true);
                setAnimate(true);
            }
        }, 3000);

        return () => clearTimeout(fallbackTimer);
    }, []);

    return (
        <>
            <Head>
                <title>Gjej pronën perfekte në Shqipëri | Gjej-Prone</title>
                <meta name="description" content="Platforma më e mirë për të gjetur, blerë, ose dhënë me qira prona në Shqipëri. Publiko pronën tënde lehtësisht dhe shiko ofertat më të fundit." />
                <link rel="preload" as="image" href={backgroundImage} />
            </Head>
            <div className="relative pb-25">

                {/* Imazhi i sfondit */}
                <div
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
                        imageLoaded ? 'opacity-100 bg-gray-200' : 'opacity-0 bg-gray-300 animate-pulse'
                    }`}
                    style={{ backgroundImage: imageLoaded ? `url(${backgroundImage})` : 'none' }}
                >
                    <div className="absolute inset-0 bg-black/40"></div> {/* mbulesë e errët për lexueshmëri më të mirë */}
                </div>

                {/* Përmbajtja */}
                <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
                    <h2
                        className={`text-2xl md:text-5xl font-bold text-white mb-4 transform transition-all duration-1000 ease-out ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                    >
                        Tregu i Pronave ne Shqiperi, i Organizuar nga Kërkesa tek Oferta

                    </h2>
                    <p
                        className={`mt-2 text-lg md:text-xl text-white/90 mb-6 max-w-4xl transform transition-all duration-1000 delay-200 ease-out ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                    >
                        Publiko falas kërkesën ose pronën tënde. Lidhje direkte mes blerësit dhe shitësit, me verifikim profesional, shërbime arkitekturore dhe prezantim premium për një proces të sigurt dhe efikas.
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
            <section className="relative z-20 bg-white/90 rounded-lg shadow-lg max-w-6xl mx-auto my-10 p-8 text-gray-900">
                <h2 className="text-2xl font-semibold mb-3 text-blue-700">Platformë Digjitale për Kërkesë & Ofertë Pronash në Shqipëri
                </h2>
                <p className="mb-4">
                    Platforma jonë është një hapësirë e dedikuar për tregun imobiliar në Shqipëri,
                    ku blerësit mund të publikojnë falas kërkesat e tyre për pronën që dëshirojnë të blejnë, ndërsa shitësit mund të listojnë falas pronat që kanë në shitje.
                </p>
                <h3 className="text-xl font-semibold mb-3 text-blue-600">Si funksionon?</h3>
                <ul className="mb-6 space-y-2 list-disc list-inside">
                    <li>
                        Blerësit publikojnë kriteret e tyre (zonë, buxhet, tipologji, sipërfaqe, etj.).
                    </li>
                    <li>
                        Shitësit listojnë pronën me detaje dhe dokumentacion përkatës.
                    </li>
                    <li>
                        Platforma ofron filtra të avancuar për kërkim të shpejtë dhe të saktë.
                    </li>
                    <li>
                        Çdo pronë verifikohet nëpërmjet certifikatës së pronësisë, me qëllim shmangien e postimeve nga agjenci dhe garantimin e transparencës.
                    </li>
                </ul>
                <h3 className="text-xl font-semibold mb-3 text-blue-600">Shërbime për Blerësit</h3>
                <p className="mb-3">
                    Përtej lidhjes direkte me shitësin, ne ofrojmë shërbime profesionale shtesë:
                </p>
                <ul className="mb-6 space-y-2 list-disc list-inside">
                    <li>
                        Interior Design – Propozime për mobilimin dhe optimizimin e hapësirës së pronës që planifikoni të blini.
                    </li>
                    <li>
                        Shërbime Arkitekturore & Verifikim Teknik – Kontroll i sipërfaqes reale, planimetrisë dhe përputhshmërisë me dokumentacionin ekzistues, përpara finalizimit të blerjes.
                    </li>
                </ul>
                <h3 className="text-xl font-semibold mb-3 text-blue-600">Shërbime për Shitësit</h3>
                <p className="mb-3">
                    Për të rritur vlerën dhe potencialin e shitjes së pronës suaj, ofrojmë:
                </p>
                <ul className="mb-6 space-y-2 list-disc list-inside">
                    <li>
                        Rivlerësim nga vlerësues të licencuar, me qëllim optimizimin fiskal dhe mundësinë e uljes së tatimit nga 15% në 5%, sipas legjislacionit në fuqi.
                    </li>
                    <li>
                        Virtual Tour & Prezantim Profesional, për t'i dhënë pronës një imazh më të avancuar dhe për të rritur interesin e blerësve.
                    </li>
                </ul>
                <h3 className="text-xl font-semibold mb-3 text-blue-600">Modeli i Platformës</h3>
                <ul className="mb-6 space-y-2 list-disc list-inside">
                    <li>
                        Listimi i pronës dhe publikimi i kërkesave është falas.
                    </li>
                    <li>
                        Shërbimet profesionale shtesë ofrohen me pagesë, sipas listës së çmimeve të VirtuNEX.
                    </li>
                    <li>
                        Në rast se një shitës kërkon kontaktin e drejtpërdrejtë të një blerësi, aplikohet një tarifë e vogël.
                    </li>
                    <li>
                        Brenda kësaj tarife përfshihet edhe koordinimi nga ana jonë: ne konfirmojmë paraprakisht nëse blerësi është ende i interesuar për pronën përkatëse, përpara se të realizohet kontakti.
                    </li>
                </ul>

                <p className="mt-6">
                    Platforma synon të krijojë një ekosistem transparent, profesional dhe të strukturuar, duke kombinuar teknologjinë me
                    shërbime arkitekturore dhe vlerësuese, për ta bërë procesin e blerjes dhe shitjes së pronës më të sigurt dhe më efikas.
                </p>
            </section>
        </>
    );
};

export default Landing;
