// resources/js/pages/PropertyDetails.jsx
import { useEffect, useState } from "react";

/* =====================
   LABEL MAPPINGS
===================== */
const PROPERTY_TYPE_LABELS = {
    residential: 'Rezidenciale',
    commercial: 'Komerciale',
    land: 'Tokë',
    others: 'Të tjera',
};

const TRANSACTION_TYPE_LABELS = {
    sale: 'Shitje',
    rent: 'Qira',
};

const subTypeProperties = {
    residential: [
        { value: 'apartment', label: 'Apartament' },
        { value: 'house', label: 'Shtëpi Private' },
        { value: 'kategori te tjera', label: 'Kategori të tjera' },
    ],
    commercial: [
        { value: 'office', label: 'Zyrë' },
        { value: 'warehouse', label: 'Magazinë' },
    ],
    land: [
        { value: 'agricultural', label: 'Tokë Bujqësore' },
        { value: 'truall', label: 'Truall' },
    ],
    others: [
        { value: 'parkim', label: 'Parkim' },
        { value: 'kategori_te_tjera', label: 'Kategori të tjera' },
    ],
};

const PropertyDetails = ({ property }) => {
    const [previewImages, setPreviewImages] = useState([]);
    const [previewIndex, setPreviewIndex] = useState(0);
    const [showPreview, setShowPreview] = useState(false);

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

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
            {/* =====================
               IMAGE GALLERY
            ===================== */}
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

                {/* Thumbnails */}
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

                {/* VIRTUAL TOUR */}
                {property.virtual_tour_link && (
                    <div className="space-y-3">
                        <h2 className="text-2xl font-semibold">Vizitë Virtuale</h2>
                        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow">
                            <iframe src={property.virtual_tour_link} className="w-full h-full" allowFullScreen />
                        </div>
                    </div>
                )}
            </div>

            {/* =====================
               CONTENT
            ===================== */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* LEFT SIDE */}
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold">
                            {PROPERTY_TYPE_LABELS[property.property_type]}
                        </h1>
                        <p className="text-gray-500 mt-1">
                            {property.street}, {property.city}
                        </p>
                    </div>

                    {/* DESCRIPTION */}
                    {property.description && (
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Përshkrimi</h3>
                            <p className="text-gray-700 leading-relaxed">{property.description}</p>
                        </div>
                    )}

                    {/* DETAILS */}
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
                            value={`${property.hipoteke ? 'Po' : 'Jo'} ${
                                hipotekeFile.length > 0 ? '(Dokumenti i ngarkuar)' : '(Dokumenti i pa ngarkuar)'
                            }`}
                        />
                        <Detail label="Ashensor" value={property.ashensor ? 'Po' : 'Jo'} />
                        <Detail label="Sipërfaqe" value={`${property.surface} m²`} />
                        <Detail label="Dhoma" value={property.total_rooms} />
                        <Detail label="Banjo" value={property.total_bathrooms} />
                        <Detail label="Ballkone" value={property.total_balconies} />
                        <Detail label="Kati" value={property.floor_number} />
                        <Detail label="Kate totale" value={property.total_floors} />
                        <Detail label="Viti ndërtimit" value={property.year_built} />
                        <Detail label="Transaksioni" value={TRANSACTION_TYPE_LABELS[property.type_of_sale]} />
                    </div>

                    {floorPlans.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold">Plani i katit</h2>

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

                    {/* MAP */}
                    <div className="space-y-3">
                        <h2 className="text-2xl font-semibold">Vendndodhja</h2>
                        <div className="w-full h-[320px] rounded-2xl overflow-hidden shadow">
                            <iframe
                                className="w-full h-full"
                                loading="lazy"
                                allowFullScreen
                                src={`https://www.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
                            />
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="space-y-6">
                    {/* PRICE */}
                    <div className="bg-white rounded-2xl p-6 shadow">
                        <p className="text-sm text-gray-500">Çmimi</p>
                        <p className="text-4xl font-bold text-primary">
                            {Number(property.price).toLocaleString()} {property.currency}
                        </p>
                    </div>

                    {/* CONTACT SELLER */}
                    <div className="bg-primary/5 rounded-2xl p-6 space-y-4">
                        <h3 className="text-lg font-semibold">Kontakto Shitësin</h3>

                        <div>
                            <p className="font-medium">{property.owner?.name}</p>
                            <p className="text-sm text-gray-600">{property.owner?.email}</p>
                            <p className="text-sm text-gray-600">{property.owner?.phone}</p>
                        </div>

                        <div className="flex gap-3">
                            <a
                                href={`mailto:${property.owner?.email}`}
                                className="flex-1 text-center bg-primary text-white py-2 rounded-lg"
                            >
                                Email
                            </a>
                            <a
                                href={`tel:${property.owner?.phone}`}
                                className="flex-1 text-center bg-green-600 text-white py-2 rounded-lg"
                            >
                                Telefon
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* =====================
               LIGHTBOX
            ===================== */}
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
                                onClick={e => {
                                    e.stopPropagation();
                                    setPreviewIndex((previewIndex - 1 + previewImages.length) % previewImages.length);
                                }}
                            >
                                ‹
                            </button>
                            <button
                                className="absolute right-4 text-white text-3xl font-bold"
                                onClick={e => {
                                    e.stopPropagation();
                                    setPreviewIndex((previewIndex + 1) % previewImages.length);
                                }}
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

/* =====================
   SMALL COMPONENTS
===================== */
const Detail = ({ label, value }) => {
    if (!value) return null;

    return (
        <div className="bg-gray-50 p-4 rounded-xl text-center">
            <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
            <p className="text-lg font-semibold">{value}</p>
        </div>
    );
};

const Status = ({ label, active }) => (
    <div className="flex justify-between items-center">
        <span>{label}</span>
        <span
            className={`px-3 py-1 text-xs rounded-full ${
                active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
            }`}
        >
            {active ? 'Po' : 'Jo'}
        </span>
    </div>
);

export default PropertyDetails;
