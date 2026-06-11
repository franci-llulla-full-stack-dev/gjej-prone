import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';

const PROPERTY_TYPE_LABELS = {
    residential: 'Rezidenciale',
    commercial:  'Komerciale',
    land:        'Tokë',
    others:      'Të tjera',
};

const TRANSACTION_TYPE_LABELS = {
    sale: 'Shitje',
    rent: 'Qira',
};

const subTypeProperties = {
    residential: [
        { value: 'apartment',         label: 'Apartament' },
        { value: 'house',             label: 'Shtëpi Private' },
        { value: 'kategori te tjera', label: 'Kategori të tjera' },
    ],
    commercial: [
        { value: 'office',     label: 'Zyrë' },
        { value: 'warehouse',  label: 'Magazinë' },
    ],
    land: [
        { value: 'agricultural', label: 'Tokë Bujqësore' },
        { value: 'truall',        label: 'Truall' },
    ],
    others: [
        { value: 'parkim',           label: 'Parkim' },
        { value: 'kategori_te_tjera', label: 'Kategori të tjera' },
    ],
};

const PropertyDetails = ({ property, isAdmin }) => {
    const [previewImages, setPreviewImages] = useState([]);
    const [previewIndex, setPreviewIndex] = useState(0);
    const [showPreview, setShowPreview] = useState(false);
    const [MapSection, setMapSection] = useState(null);
    const [pageUrl, setPageUrl] = useState('');

    // Load map client-side only (Leaflet requires browser APIs)
    useEffect(() => {
        import('../components/PropertyMapSection').then(mod => {
            setMapSection(() => mod.default);
        });
        setPageUrl(window.location.href);
    }, []);

    useEffect(() => {
        const allImages = [
            ...(property.images ?? []),
            ...(property.documents?.filter(doc => doc.file_type === 'floor_plan')?.map(doc => ({
                id: doc.id,
                path: doc.path,
                isFloorPlan: true,
            })) ?? []),
        ];
        setPreviewImages(allImages);
    }, [property.images, property.documents]);

    const floorPlans = property.documents?.filter(doc => doc.file_type === 'floor_plan') ?? [];
    const hipotekeFile = property.documents?.filter(doc => doc.file_type === 'hipoteka') ?? [];
    const images = property.images ?? [];
    const [current, setCurrent] = useState(0);
    const [lightbox, setLightbox] = useState(false);

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    const typeLabel = PROPERTY_TYPE_LABELS[property.property_type] ?? property.property_type;
    const ogTitle   = `${typeLabel} në ${property.city} — ${Number(property.price).toLocaleString()} ${property.currency}`;
    const ogDesc    = property.description
        ? property.description.substring(0, 200)
        : `${typeLabel} për ${TRANSACTION_TYPE_LABELS[property.type_of_sale] ?? ''} në ${property.city}.`;
    const ogImage   = images[0] ? `/storage/${images[0].path}` : '/logo-2.png';

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
            <Head>
                <title>{`${ogTitle} | Gjej-Prone`}</title>
                <meta name="description"         content={ogDesc} />
                <meta property="og:title"        content={ogTitle} />
                <meta property="og:description"  content={ogDesc} />
                <meta property="og:image"        content={ogImage} />
                <meta property="og:type"         content="website" />
                <meta name="twitter:card"        content="summary_large_image" />
                <meta name="twitter:title"       content={ogTitle} />
                <meta name="twitter:description" content={ogDesc} />
                <meta name="twitter:image"       content={ogImage} />
            </Head>

            {/* IMAGE GALLERY */}
            <div className="space-y-4">
                <div
                    className="relative w-full h-[480px] overflow-hidden rounded-2xl shadow-lg cursor-pointer"
                    onClick={() => setLightbox(true)}
                >
                    <img
                        src={`/storage/${images[current]?.path}`}
                        className="w-full h-full object-cover"
                        alt="Property"
                    />
                    <span className="absolute top-4 left-4 bg-black/70 text-white px-4 py-1 rounded-full text-sm uppercase tracking-wide">
                        {PROPERTY_TYPE_LABELS[property.property_type]}
                    </span>
                </div>
                <div className="flex gap-3 overflow-x-auto">
                    {images.map((img, index) => (
                        <img
                            key={img.id}
                            src={`/storage/${img.path}`}
                            onClick={() => setCurrent(index)}
                            className={`w-24 h-20 object-cover rounded-lg cursor-pointer border-2 transition ${
                                index === current ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                            alt="Thumbnail"
                        />
                    ))}
                </div>
                {property.virtual_tour_link && (
                    <div className="space-y-3">
                        <h2 className="text-2xl font-semibold">Vizitë Virtuale</h2>
                        <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow">
                            <iframe src={property.virtual_tour_link} className="w-full h-full" allowFullScreen />
                        </div>
                    </div>
                )}
            </div>

            {/* CONTENT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* LEFT SIDE */}
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold">
                            {PROPERTY_TYPE_LABELS[property.property_type]}
                        </h1>
                        {(property.street || property.city) && (
                            <p className="text-gray-500 mt-1">
                                {property.street}{property.street && property.city ? ', ' : ''}{property.city}
                            </p>
                        )}
                    </div>

                    {/* ADMIN TRACKING INFO */}
                    {isAdmin && (property.tracking_phone || property.tracking_email) && (
                        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                            <h3 className="text-lg font-semibold mb-3 text-gray-800">Të Dhëna për Gjurmim (Vetëm Admin)</h3>
                            <div className="space-y-2">
                                {property.tracking_phone && (
                                    <div>
                                        <p className="text-sm text-gray-500">Telefon për Gjurmim:</p>
                                        <p className="text-base font-medium">{property.tracking_phone}</p>
                                    </div>
                                )}
                                {property.tracking_email && (
                                    <div>
                                        <p className="text-sm text-gray-500">Email për Gjurmim:</p>
                                        <p className="text-base font-medium">{property.tracking_email}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {property.description && (
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Përshkrimi</h3>
                            <p className="text-gray-700 leading-relaxed">{property.description}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Detail
                            label="Lloji i pronës"
                            value={
                                subTypeProperties[property.property_type]?.find(
                                    o => o.value === property.property_category
                                )?.label
                            }
                        />
                        <Detail
                            label="Hipotekë"
                            value={
                                <>
                                    {`${property.hipoteke ? 'Po' : 'Jo'} ${
                                        hipotekeFile.length > 0 ? '(Dokumenti i ngarkuar)' : '(Dokumenti i pa ngarkuar)'
                                    }`}
                                    {isAdmin && hipotekeFile.length > 0 && (
                                        <a
                                            href={`/admin/property/download-hipoteka/${hipotekeFile[0].id}`}
                                            className="ml-2 text-blue-600 underline"
                                            download
                                        >
                                            Shkarko
                                        </a>
                                    )}
                                </>
                            }
                        />
                        <Detail label="Ashensor"  value={property.ashensor ? 'Po' : 'Jo'} />
                        <Detail label="Parkim"    value={property.parkim ? 'Po' : 'Jo'} />
                        <Detail label="Mobiluar"  value={property.mobilim ? 'Po' : 'Jo'} />
                        <Detail label="Sipërfaqe" value={property.surface ? `${property.surface} m²` : null} />
                        {property.total_rooms > 0      && <Detail label="Dhoma"         value={property.total_rooms} />}
                        {property.total_bathrooms > 0  && <Detail label="Banjo"         value={property.total_bathrooms} />}
                        {property.total_balconies > 0  && <Detail label="Ballkone"      value={property.total_balconies} />}
                        {property.floor_number != null && property.floor_number !== 0 && (
                            <Detail label="Kati" value={property.floor_number} />
                        )}
                        {property.total_floors > 0 && <Detail label="Kate totale"   value={property.total_floors} />}
                        {property.year_built       && <Detail label="Viti ndërtimit" value={property.year_built} />}
                        <Detail label="Transaksioni" value={TRANSACTION_TYPE_LABELS[property.type_of_sale]} />
                    </div>

                    {floorPlans.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold">Planimetria</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {floorPlans.map(plan => (
                                    <div
                                        key={plan.id}
                                        className="group bg-white rounded-xl shadow overflow-hidden cursor-pointer"
                                        onClick={() => {
                                            const index = previewImages.findIndex(
                                                img => img.id === plan.id && img.isFloorPlan
                                            );
                                            if (index >= 0) {
                                                setPreviewIndex(index);
                                                setShowPreview(true);
                                            }
                                        }}
                                    >
                                        <img
                                            src={`/storage/${plan.path}`}
                                            alt="Plani i katit"
                                            className="w-full h-64 object-contain bg-gray-50 transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="p-3 text-center text-sm text-gray-600">Shiko planin</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT SIDE */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow">
                        <p className="text-sm text-gray-500">Çmimi</p>
                        <p className="text-4xl font-bold text-blue-600">
                            {Number(property.price).toLocaleString()} {property.currency}
                            {property.price_negotiable && <span className="text-lg"> (i negociueshëm)</span>}
                        </p>
                    </div>
                </div>
            </div>

            {/* MAP */}
            <div className="space-y-3">
                <h2 className="text-2xl font-semibold">Vendndodhja</h2>
                {MapSection
                    ? <MapSection lat={property.latitude} lng={property.longitude} />
                    : <div className="w-full h-[320px] bg-gray-100 rounded-2xl animate-pulse" />
                }
            </div>

            {/* CONTACT */}
            {property.owner?.phone_number && (
                <div className="bg-blue-50 rounded-2xl p-6 space-y-4 max-w-md">
                    <h3 className="text-lg font-semibold">Kontakto Shitësin</h3>
                    <div className="flex gap-3">
                        <a
                            href={`https://wa.me/${property.owner.phone_number}?text=${encodeURIComponent(
                                `Përshëndetje, jam i interesuar për pronën tuaj.\n\n${pageUrl}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center bg-green-600 text-white py-2 rounded-lg"
                        >
                            WhatsApp
                        </a>
                    </div>
                </div>
            )}

            {/* LIGHTBOX */}
            {lightbox && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
                    onClick={() => setLightbox(false)}
                >
                    <img
                        src={`/storage/${images[current]?.path}`}
                        className="max-h-[90vh] max-w-[90vw] object-contain"
                        alt="Fullscreen"
                    />
                    {images.length > 1 && (
                        <>
                            <button
                                className="absolute left-7 text-white text-7xl font-bold"
                                onClick={e => { e.stopPropagation(); setCurrent((current - 1 + images.length) % images.length); }}
                            >
                                ‹
                            </button>
                            <button
                                className="absolute right-7 text-white text-7xl font-bold"
                                onClick={e => { e.stopPropagation(); setCurrent((current + 1) % images.length); }}
                            >
                                ›
                            </button>
                        </>
                    )}
                </div>
            )}

            {showPreview && previewImages.length > 0 && (
                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                    onClick={() => setShowPreview(false)}
                >
                    <img
                        src={`/storage/${previewImages[previewIndex].path}`}
                        alt=""
                        className="max-h-[90%] max-w-[90%] object-contain rounded-lg shadow-lg"
                    />
                    {previewImages.length > 1 && (
                        <>
                            <button
                                className="absolute left-4 text-white text-3xl font-bold"
                                onClick={e => { e.stopPropagation(); setPreviewIndex((previewIndex - 1 + previewImages.length) % previewImages.length); }}
                            >
                                ‹
                            </button>
                            <button
                                className="absolute right-4 text-white text-3xl font-bold"
                                onClick={e => { e.stopPropagation(); setPreviewIndex((previewIndex + 1) % previewImages.length); }}
                            >
                                ›
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

const Detail = ({ label, value }) => {
    if (!value && value !== 0) return null;
    if (value === 0) return null;
    return (
        <div className="bg-gray-50 p-4 rounded-xl text-center">
            <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
            <p className="text-lg font-semibold">{value}</p>
        </div>
    );
};

export default PropertyDetails;