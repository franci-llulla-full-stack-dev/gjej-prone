// resources/js/pages/PropertyDetails.jsx
import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
/* =====================
   LABEL MAPPINGS
===================== */
const PLACE_TYPES = [
    { key: "school", label: "Shkolla", color: "#2563eb" },
    { key: "hospital", label: "Spitale", color: "#dc2626" },
    { key: "police", label: "Polici", color: "#0ea5e9" },
    { key: "fire_station", label: "Zjarrfikës", color: "#f59e42" },
    { key: "supermarket", label: "Supermarkete", color: "#22c55e" },
    { key: "bakery", label: "Furrë buke", color: "#eab308" },
    { key: "pharmacy", label: "Farmaci", color: "#a21caf" },
];
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

function NearbyPlaces({ lat, lng, selectedType }) {
    const [allPlaces, setAllPlaces] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!lat || !lng) return;
        setLoading(true);
        axios.get("/nearby-places", { params: { lat, lng, radius: 2000 } })
            .then(res => {
                // Group by type
                const grouped = {};
                for (const place of res.data) {
                    if (!grouped[place.type]) grouped[place.type] = [];
                    grouped[place.type].push(place);
                }
                setAllPlaces(grouped);
                setLoading(false);
            })
            .catch(() => {
                setAllPlaces({});
                setLoading(false);
            });
    }, [lat, lng]);

    if (!selectedType) return null;
    const typeObj = PLACE_TYPES.find(t => t.key === selectedType);
    const places = allPlaces[selectedType] || [];

    return (
        <>
            {loading && <div>Loading...</div>}
            {!loading && places.map(place => (
                <CircleMarker
                    key={place.id}
                    center={[place.latitude, place.longitude]}
                    radius={12}
                    pathOptions={{ color: typeObj.color, fillColor: typeObj.color, fillOpacity: 0.7 }}
                >
                    <Popup>
                        {place.name || "Pa emër"}<br />
                        {typeObj.label}
                    </Popup>
                </CircleMarker>
            ))}
        </>
    );
}

const PropertyDetails = ({ property }) => {
    const isAdmin = usePage().props.auth?.user?.role === 'admin';
    const [previewImages, setPreviewImages] = useState([]);
    const [previewIndex, setPreviewIndex] = useState(0);
    const [showPreview, setShowPreview] = useState(false);
    const [selectedType, setSelectedType] = useState(null);

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
                        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow">
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
                        <p className="text-gray-500 mt-1">
                            {property.street}, {property.city}
                        </p>
                    </div>
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
                        <Detail label="Ashensor" value={property.ashensor ? 'Po' : 'Jo'} />
                        <Detail label="Parkim" value={property.parkim ? 'Po' : 'Jo'} />
                        <Detail label="Mobiluar" value={property.mobilim ? 'Po' : 'Jo'} />
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

                </div>
                {/* RIGHT SIDE */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow">
                        <p className="text-sm text-gray-500">Çmimi</p>
                        <p className="text-4xl font-bold text-primary">
                            {Number(property.price).toLocaleString()} {property.currency} {property.price_negotiable ? '(i negociueshëm)' : ''}
                        </p>
                    </div>
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
            <div className="space-y-3">
                <h2 className="text-2xl font-semibold">Vendndodhja</h2>
                <div className="mb-2 flex border-b border-gray-200">
                    {PLACE_TYPES.map(type => (
                        <button
                            key={type.key}
                            type="button"
                            onClick={() => setSelectedType(type.key)}
                            className={`px-4 py-2 -mb-px font-medium transition border-b-2
                ${selectedType === type.key
                                ? "border-primary text-primary"
                                : "border-transparent text-gray-600 hover:text-primary"
                            }`}
                            style={{ minWidth: 110 }}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
                <div className="w-full h-[320px] rounded-2xl overflow-hidden shadow">
                    <MapContainer
                        center={[property.latitude, property.longitude]}
                        zoom={16}
                        style={{ height: "100%", width: "100%" }}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; OpenStreetMap contributors"
                        />
                        <Marker position={[property.latitude, property.longitude]}>
                            <Popup>Prona</Popup>
                        </Marker>
                        <NearbyPlaces
                            lat={property.latitude}
                            lng={property.longitude}
                            selectedType={selectedType}
                        />
                    </MapContainer>
                </div>
            </div>
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
                                onClick={e => {
                                    e.stopPropagation();
                                    setCurrent((current - 1 + images.length) % images.length);
                                }}
                            >
                                ‹
                            </button>
                            <button
                                className="absolute right-7 text-white text-7xl font-bold"
                                onClick={e => {
                                    e.stopPropagation();
                                    setCurrent((current + 1) % images.length);
                                }}
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
