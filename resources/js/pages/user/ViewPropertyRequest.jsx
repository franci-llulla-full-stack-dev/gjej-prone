import PropertyMap from '../../components/PropertyMap.jsx';

/* =====================
   LABEL MAPPINGS
===================== */
const PROPERTY_TYPE_LABELS = {
    residential: 'Rezidenciale',
    commercial: 'Komerciale',
    land: 'Toke',
    others: 'Te tjera',
};

const TRANSACTION_TYPE_LABELS = {
    sale: 'Blerje',
    rent: 'Qira',
};

const FUNDING_SOURCE_LABELS = {
    kredi: 'Kredi',
    kursime: 'Kursime',
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
const ViewPropertyRequest = ({ propertyRequest, actual_contact }) => {
    return (
        <div className="max-w-7xl mx-auto mt-5 px-4 py-10 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* LEFT SIDE */}
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold">
                            {PROPERTY_TYPE_LABELS[propertyRequest.property_type]}
                        </h1>
                        {(propertyRequest.street || propertyRequest.city) && (
                            <p className="text-gray-500 mt-1">
                                {propertyRequest.street}{propertyRequest.street && propertyRequest.city ? ', ' : ''}{propertyRequest.city}
                            </p>
                        )}
                    </div>

                    {/* DESCRIPTION */}
                    {propertyRequest.description && (
                        <div>
                            <h3 className="text-xl font-semibold mb-2">
                                Pershkrimi
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                {propertyRequest.description}
                            </p>
                        </div>
                    )}

                    {/* DETAILS */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Detail
                            label="Lloji i prones"
                            value={
                                subTypeProperties[propertyRequest.property_type]
                                    ?.find(o => o.value === propertyRequest.property_category)
                                    ?.label
                            }
                        />
                        <Detail
                            label="Hipoteke"
                            value={(propertyRequest.hipoteke ? "Po" : "Jo " )}
                        />

                        <Detail
                            label="Ashensor"
                            value={propertyRequest.ashensor ? "Po" : "Jo"}
                        />
                        <Detail label="Siperfaqe" value={`${propertyRequest.surface}-${propertyRequest.surface_2} m²`} />
                        {propertyRequest.total_rooms > 0 && (
                            <Detail label="Dhoma" value={`${propertyRequest.total_rooms}-${propertyRequest.total_rooms_2}`} />
                        )}
                        {propertyRequest.total_bathrooms > 0 && (
                            <Detail label="Banjo" value={`${propertyRequest.total_bathrooms}-${propertyRequest.total_bathrooms_2}`} />
                        )}
                        {propertyRequest.total_balconies > 0 && (
                            <Detail label="Ballkone" value={`${propertyRequest.total_balconies}-${propertyRequest.total_balconies_2}`} />
                        )}
                        {propertyRequest.floor_number != null && propertyRequest.floor_number !== 0 && (
                            <Detail label="Kati" value={propertyRequest.floor_number} />
                        )}
                        {propertyRequest.total_floors > 0 && (
                            <Detail label="Kate totale" value={propertyRequest.total_floors} />
                        )}
                        <Detail
                            label="Transaksioni"
                            value={TRANSACTION_TYPE_LABELS[propertyRequest.type_of_sale]}
                        />
                        {propertyRequest.funds && (
                            <Detail
                                label="Burimi i Financimit"
                                value={FUNDING_SOURCE_LABELS[propertyRequest.funds]}
                            />
                        )}
                        {propertyRequest.architect === true && (
                            <Detail label="Shërbime" value="Kërkon Arkitekt" />
                        )}
                        {propertyRequest.interior_design === true && (
                            <Detail label="Shërbime" value="Kërkon Interior Dizajner" />
                        )}
                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="space-y-6">
                    {/* PRICE */}
                    <div className="bg-white rounded-2xl p-6 shadow">
                        <p className="text-sm text-gray-500">Cmimi</p>
                        <p className="text-4xl font-bold text-primary">
                            {Number(propertyRequest.price).toLocaleString()}-{Number(propertyRequest.price_2).toLocaleString()} {propertyRequest.currency}
                        </p>
                    </div>
                </div>
            </div>

            {/* MAP */}
            <div className="space-y-3">
                <h2 className="text-2xl font-semibold">
                    Vendndodhja
                </h2>
                <div className="w-full h-[320px] rounded-2xl overflow-hidden shadow">
                    <PropertyMap
                        lat={propertyRequest.latitude}
                        lng={propertyRequest.longitude}
                        radius={propertyRequest.zone_radious}
                    />
                </div>
            </div>

            {/* CONTACT SELLER */}
            <div className="bg-blue-50 rounded-2xl p-6 space-y-4 max-w-md">
                <h3 className="text-lg font-semibold">
                    Kontakto Bleresin
                </h3>
                <div className="flex gap-3">
                    <a
                        href={`https://wa.me/${actual_contact ? actual_contact.replace(/[^0-9]/g, '') : '355697727747'}?text=${encodeURIComponent(`Përshëndetje, jam i interesuar për kërkesën tuaj të pronës.\n\n${window.location.href}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center bg-green-600 text-white py-2 rounded-lg"
                    >
                        WhatsApp
                    </a>
                </div>
            </div>
        </div>


    );
};

/* =====================
   SMALL COMPONENTS
===================== */
const Detail = ({ label, value }) => {
    // Don't render if value is null, undefined, empty string, or 0
    if (!value && value !== 0) return null;
    if (value === 0) return null;

    return (
        <div className="bg-gray-50 p-4 rounded-xl text-center">
            <p className="text-xs uppercase tracking-wide text-gray-500">
                {label}
            </p>
            <p className="text-lg font-semibold">
                {value}
            </p>
        </div>
    );
};

export default ViewPropertyRequest;
