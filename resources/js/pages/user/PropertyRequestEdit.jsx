import { useForm } from '@inertiajs/react';
import Select from 'react-select';
import React, { useState } from 'react';
import locations from '../../../data/locations.json';
import MapPickerRange from '../../components/MapPickerRange.jsx';
import ErrorText from '../../components/ErrorText.jsx';
import AsyncSelect from 'react-select/async';

const inputBase =
    "w-full mt-1 px-4 py-1.5 border border-gray-300 bg-white text-gray-700 " +
    "focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all " +
    "placeholder-gray-400";

const labelBase = "block text-sm font-medium text-gray-700 mb-1";
const errorBase = "text-sm text-red-500 mt-1";

export default function PropertyRequestEdit({propertyRequest, isAdmin, users}) {
    const { data, setData, put, processing, errors } = useForm({
        type_of_sale: propertyRequest.type_of_sale,
        user_id: propertyRequest.user_id || '',
        property_type: propertyRequest.property_type,
        property_category: propertyRequest.property_category,
        city: propertyRequest.city,
        street: propertyRequest.street,
        latitude: propertyRequest.latitude,
        longitude: propertyRequest.longitude,
        zone_radious: propertyRequest.zone_radious || 500,
        surface: propertyRequest.surface,
        surface_2: propertyRequest.surface_2,
        price: propertyRequest.price,
        price_2: propertyRequest.price_2,
        currency: propertyRequest.currency,
        description: propertyRequest.description,
        total_rooms: propertyRequest.total_rooms,
        total_rooms_2: propertyRequest.total_rooms_2,
        total_bathrooms: propertyRequest.total_bathrooms,
        total_bathrooms_2: propertyRequest.total_bathrooms_2,
        total_balconies: propertyRequest.total_balconies,
        total_balconies_2: propertyRequest.total_balconies_2,
        floor_number: propertyRequest.floor_number,
        total_floors: propertyRequest.total_floors,
        year_built: propertyRequest.year_built,
        ashensor: propertyRequest.ashensor,
        hipoteke: propertyRequest.hipoteke,
        interior_design: propertyRequest.interior_design,
        architect: propertyRequest.architect,
        expires_at: propertyRequest.expires_at,
    });
    const [zoneRadius, setZoneRadius] = useState(data.zone_radious);
    const [coords,setCoords ] = useState({lat:data.latitude,lng:data.longitude});
    const saleOptions = [
        { value: '', label: 'Zgjidh Llojin e Transaksionit' },
        { value: 'sale', label: 'Shitje' },
        { value: 'rent', label: 'Qira' }
    ];
    const typeOfProperties = [
        { value: 'residential', label: 'Rezidenciale' },
        { value: 'commercial', label: 'Komerciale' },
        { value: 'land', label: 'Tokë' },
        { value: 'others', label: 'Të tjera' },
    ];

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

    const dynamicFieldsMap = {
        apartment: [
            { value: ['total_rooms', 'total_rooms_2'], type: 'minmax', label: 'Numri i dhomave', placeholder: ['Min', 'Max'] },
            { value: ['total_bathrooms', 'total_bathrooms_2'], type: 'minmax', label: 'Numri i Banjove', placeholder: ['Min', 'Max'] },
            { value: ['total_balconies', 'total_balconies_2'], type: 'minmax', label: 'Numri i Ballkoneve', placeholder: ['Min', 'Max'] },
            { value: 'floor_number', type: 'number', label: 'Kati', placeholder: 'p.sh. 5' },
        ],
        house: [
            { value: ['total_rooms', 'total_rooms_2'], type: 'minmax', label: 'Numri i dhomave', placeholder: ['Min', 'Max'] },
            { value: ['total_bathrooms', 'total_bathrooms_2'], type: 'minmax', label: 'Numri i Banjove', placeholder: ['Min', 'Max'] },
            { value: 'total_floors', type: 'number', label: 'Numri i Kateve të Ndërtimit', placeholder: 'p.sh. 3' },
            { value: ['total_balconies', 'total_balconies_2'], type: 'minmax', label: 'Numri i Ballkoneve', placeholder: ['Min', 'Max'] },
        ],
        office: [
            { value: 'floor_number', type: 'number', label: 'Kati', placeholder: 'p.sh. 2' },
        ],
    };

    const expiresAtOptions = [
        { value: '', label: 'Zgjidh afatin' },
        { value: '1m', label: 'Deri në 1 muaj' },
        { value: '3m', label: 'Deri në 3 muaj' },
        { value: '6m', label: 'Deri në 6 muaj' },
        { value: '1y', label: 'Deri në 1 vit' },
    ];
    const renderDynamicFields = (selectedSubtype, data, setData) => {
        if (!selectedSubtype || !dynamicFieldsMap[selectedSubtype]) {
            return null;
        }

        return dynamicFieldsMap[selectedSubtype].map((field) => {
            const isYearBuilt = field.value === "year_built";

            if (field.type === 'minmax') {
                return (
                    <div key={field.label}>
                        <label className={labelBase}>{field.label}</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                value={data[field.value[0]] || ""}
                                placeholder={field.placeholder[0]}
                                onChange={e => setData(field.value[0], e.target.value)}
                                className={inputBase}
                            />
                            <input
                                type="number"
                                value={data[field.value[1]] || ""}
                                placeholder={field.placeholder[1]}
                                onChange={e => setData(field.value[1], e.target.value)}
                                className={inputBase}
                            />
                        </div>
                        <ErrorText field={field.value[0]} errors={errors} />
                        <ErrorText field={field.value[1]} errors={errors} />
                    </div>
                );
            }

            // For single number fields
            return (
                <div key={field.value}>
                    <label className={labelBase}>{field.label}</label>
                    <input
                        type={field.type}
                        value={data[field.value] || ""}
                        placeholder={field.placeholder || ""}
                        onChange={e => setData(field.value, e.target.value)}
                        {...(isYearBuilt ? { min: 1900, max: 2050 } : {})}
                        className={inputBase}
                    />
                    <ErrorText field={field.value} errors={errors} />
                </div>
            );
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/property/request/${propertyRequest.id}`);
    };
    const loadUserOptions = (inputValue, callback) => {
        const filteredUsers = users
            .filter(user =>
                `${user.name} ${user.surname}`.toLowerCase().includes(inputValue.toLowerCase())
            )
            .map(user => ({
                value: user.id,
                label: `${user.name} ${user.surname}`,
            }));
        callback(filteredUsers);
    };
    return (
        <div className="pt-20 bg-gray-50 min-h-screen">

            <main className="max-w-4xl mx-auto px-4 pb-20">
                <h1 className="text-3xl font-bold mb-5 pt-4 text-gray-800 opacity-0 animate-fade-in-up">
                    Perditeso Kerkesen
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 opacity-0 animate-fade-in"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            {isAdmin && (
                                <div>
                                    <label className={labelBase}>Zgjidh Përdoruesin *</label>
                                    <AsyncSelect
                                        cacheOptions
                                        loadOptions={loadUserOptions}
                                        defaultOptions={users.map(user => ({
                                            value: user.id,
                                            label: `${user.name} ${user.surname}`,
                                        }))}
                                        value={    data.user_id
                                            ? users.find(user => user.id === data.user_id)
                                                ? { value: data.user_id, label: `${users.find(user => user.id === data.user_id).name} ${users.find(user => user.id === data.user_id).surname}` }
                                                : null
                                            : null
                                        }
                                        onChange={(selected) => setData('user_id', selected ? selected.value : '')}
                                        placeholder="Kërko përdoruesin..."
                                        classNamePrefix="react-select"
                                    />
                                    <ErrorText field="user_id" errors={errors} />
                                </div>
                            )}
                        </div>
                        <div>
                            <label className={labelBase}>Lloji i Transaksionit *</label>
                            <Select
                                name="type_of_sale"
                                value={saleOptions.find((o) => o.value === data.type_of_sale) || null}
                                onChange={(selected) => {
                                    setData('type_of_sale', selected ? selected.value : '');
                                }}
                                options={saleOptions}
                                placeholder="Zgjidh llojin"
                                classNamePrefix="react-select"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: 'transparent',
                                        borderColor: '#d1d5db',
                                    }),
                                    menu: (provided) => ({
                                        ...provided,
                                        backgroundColor: 'white',
                                    }),
                                    singleValue: (provided) => ({
                                        ...provided,
                                        color: '#111827',
                                    }),
                                    placeholder: (provided) => ({
                                        ...provided,
                                        color: '#6b7280',
                                    }),
                                }}
                            />
                            <ErrorText field="type_of_sale" errors={errors} />

                        </div>
                        <div>
                            <label className={labelBase}>Lloji i Pronës *</label>
                            <Select
                                name="property_type"
                                value={typeOfProperties.find((o) => o.value === data.property_type) || null}
                                onChange={(selected) => {
                                    setData('property_type', selected ? selected.value : '');
                                    setData('property_category', '');
                                }}
                                options={typeOfProperties}
                                placeholder="Zgjidh llojin"
                                classNamePrefix="react-select z-50"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: 'transparent',
                                        borderColor: '#d1d5db',
                                    }),
                                    menu: (provided) => ({
                                        ...provided,
                                        backgroundColor: 'white',
                                    }),
                                    singleValue: (provided) => ({
                                        ...provided,
                                        color: '#111827',
                                    }),
                                    placeholder: (provided) => ({
                                        ...provided,
                                        color: '#6b7280',
                                    }),
                                }}
                            />
                            <ErrorText field="property_type" errors={errors} />

                        </div>
                        <div>
                            <label className={labelBase}>Kategoria e Pronës *</label>
                            <Select
                                name="property_category"
                                value={
                                    data.property_type
                                        ? subTypeProperties[data.property_type].find(o => o.value === data.property_category) || null
                                        : null
                                }
                                onChange={selected => setData('property_category', selected ? selected.value : '')}
                                options={data.property_type ? subTypeProperties[data.property_type] : []}
                                isDisabled={!data.property_type}
                                placeholder="Zgjidh kategorinë"
                                classNamePrefix="react-select z-50"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: 'transparent',
                                        borderColor: '#d1d5db',
                                    }),
                                    menu: (provided) => ({
                                        ...provided,
                                        backgroundColor: 'white',
                                    }),
                                    singleValue: (provided) => ({
                                        ...provided,
                                        color: '#111827',
                                    }),
                                    placeholder: (provided) => ({
                                        ...provided,
                                        color: '#6b7280',
                                    }),
                                }}
                            />
                            <ErrorText field="property_category" errors={errors} />

                        </div>
                        <div >
                            <label className={labelBase}>Qyteti *</label>
                            <Select
                                value={locations.cities.find(
                                    city => city.label === data.city
                                ) || null}
                                onChange={(selected) => {
                                    setData('city', selected ? selected.label : '');
                                }}
                                menuPortalTarget={document.body}
                                options={locations.cities}
                                placeholder="Zgjidh Bashkinë"
                                classNamePrefix="react-select z-50"
                                isDisabled={!locations.cities.length}
                            />
                            <ErrorText field="city" errors={errors} />

                        </div>

                        <div>
                            <label className={labelBase}>Afati *</label>
                            <Select
                                name="expires_at"
                                value={expiresAtOptions.find(o => o.value === data.expires_at) || expiresAtOptions[0]}
                                onChange={selected => setData('expires_at', selected ? selected.value : '')}
                                options={expiresAtOptions}
                                placeholder="Zgjidh afatin"
                                classNamePrefix="react-select"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: 'transparent',
                                        borderColor: '#d1d5db',
                                    }),
                                    menu: (provided) => ({
                                        ...provided,
                                        backgroundColor: 'white',
                                    }),
                                    singleValue: (provided) => ({
                                        ...provided,
                                        color: '#111827',
                                    }),
                                    placeholder: (provided) => ({
                                        ...provided,
                                        color: '#6b7280',
                                    }),
                                }}
                            />
                            <ErrorText field="expires_at" errors={errors} />
                        </div>
                        <div>
                            <label className={labelBase}>Sipërfaqja *</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    value={data.surface || ""}
                                    placeholder="Min"
                                    onChange={e => setData('surface', e.target.value)}
                                    className={inputBase}
                                />
                                <input
                                    type="number"
                                    value={data.surface_2 || ""}
                                    placeholder="Max"
                                    onChange={e => setData('surface_2', e.target.value)}
                                    className={inputBase}
                                />
                            </div>
                            <ErrorText field="surface" errors={errors} />
                            <ErrorText field="surface_2" errors={errors} />
                        </div>
                        <div>
                            <label className={labelBase}>Çmimi *</label>
                            <div className="flex gap-2 items-center">
                                <input
                                    type="number"
                                    value={data.price || ""}
                                    placeholder="Min"
                                    onChange={e => setData('price', e.target.value)}
                                    className={inputBase}
                                />
                                <input
                                    type="number"
                                    value={data.price_2 || ""}
                                    placeholder="Max"
                                    onChange={e => setData('price_2', e.target.value)}
                                    className={inputBase}
                                />
                                <Select
                                    name="currency"
                                    className="mt-1 min-w-24"
                                    value={data.currency ? { value: data.currency, label: data.currency } : { value: 'EUR', label: 'EUR' }}
                                    onChange={(selected) => {
                                        setData('currency', selected ? selected.value : '');
                                    }}
                                    options={[
                                        { value: 'EUR', label: 'EUR' },
                                        { value: 'USD', label: 'USD' },
                                        { value: 'ALL', label: 'ALL' },
                                    ]}
                                    classNamePrefix="react-select"
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            backgroundColor: 'transparent',
                                            borderColor: '#d1d5db',
                                        }),
                                        menu: (provided) => ({
                                            ...provided,
                                            backgroundColor: 'white',
                                        }),
                                        singleValue: (provided) => ({
                                            ...provided,
                                            color: '#111827',
                                        }),
                                        placeholder: (provided) => ({
                                            ...provided,
                                            color: '#6b7280',
                                        }),
                                    }}
                                />
                            </div>
                            <ErrorText field="price" errors={errors} />
                            <ErrorText field="price_2" errors={errors} />
                        </div>

                        {renderDynamicFields(data.property_category, data, setData)}
                        <div className="mt-4">
                            <label className={labelBase}>Vendndodhja në hartë *</label>

                            <MapPickerRange
                                lat={coords.lat}
                                lng={coords.lng}
                                zoneRadius={zoneRadius}
                                className="relative z-0"
                                style={{zIndex: 0}}
                                onSelect={(location) => {
                                    setCoords({ lat: location.lat, lng: location.lng });

                                    setData("latitude", location.lat);
                                    setData("longitude", location.lng);

                                    setData("street", location.road);
                                }}
                            />

                            {errors.latitude && <p className={errorBase}>{errors.latitude}</p>}
                            <div className="mt-2">
                                <label className={labelBase}>Zgjedh rrezen (m)</label>
                                <input
                                    type="range"
                                    min={100}
                                    max={5000}
                                    step={50}
                                    value={zoneRadius}
                                    onChange={(e) => {
                                        setZoneRadius(e.target.value);
                                        setData('zone_radious', e.target.value);
                                    }}
                                    className="w-full"
                                />
                                <p className="text-sm text-gray-500">Rreze: {zoneRadius}m</p>
                            </div>
                        </div>


                    </div>

                    <div className="mt-6 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
                        <label className={labelBase}>Përshkrimi</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className={inputBase + " h-32 resize-none"}
                            placeholder="Shkruani detaje të pronës..."
                        />
                        {errors.description && <p className={errorBase}>{errors.description}</p>}
                    </div>
                    <div className="mt-6 bg-gray-50 p-4 rounded-xl border">
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">
                            Detaje Teknike
                        </h3>

                        <label className="flex items-center gap-3 mb-2">
                            <input
                                type="checkbox"
                                checked={data.ashensor}
                                onChange={(e) => setData('ashensor', e.target.checked)}
                            />
                            <span className="text-gray-700">
                                Ka ashensor
                            </span>
                        </label>

                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={data.hipoteke}
                                onChange={(e) => setData('hipoteke', e.target.checked)}
                            />
                            <span className="text-gray-700">
                                Ka hipoteke
                            </span>
                        </label>
                    </div>
                    <div className="mt-8 bg-gray-50 p-4 rounded-xl border">
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">
                            Shërbime Ekstra
                        </h3>

                        {/* 1. Virtual Tour */}
                        <label className="flex items-center gap-3 mb-2">
                            <input
                                type="checkbox"
                                checked={data.interior_design}
                                onChange={(e) => {
                                    setData('interior_design', e.target.checked);
                                }}
                            />
                            <span className="text-gray-700">
                                Me nevojitet Interior Design
                            </span>
                        </label>

                        {/* 2. Rivlersim */}
                        <label className="flex items-center gap-3 mb-2">
                            <input
                                type="checkbox"
                                checked={data.architect}
                                onChange={(e) => {
                                    setData('architect', e.target.checked);
                                }}
                            />
                            <span className="text-gray-700">
                                Me nevojitet Arkitekt
                            </span>
                        </label>
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-8 w-full py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-md hover:shadow-xl opacity-0 animate-fade-in-up"
                        style={{ animationDelay: "1s" }}
                    >
                        Perditeso Kerkesen
                    </button>
                </form>
            </main>
        </div>
    );
}
