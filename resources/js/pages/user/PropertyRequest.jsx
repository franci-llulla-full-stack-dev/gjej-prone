import { useForm } from '@inertiajs/react';
import { Range } from 'react-range';
import Select from 'react-select';
import React, { useState, useEffect } from 'react';
import locations from '../../../data/locations.json';
import MapPickerRange from '../../components/MapPickerRange.jsx';
import toast from "react-hot-toast";
import ErrorText from '../../components/ErrorText.jsx';
import SurfaceRange from '../../components/SurfaceRange.jsx';
import PriceRange from '../../components/PriceRange.jsx';
import AsyncSelect from 'react-select/async';

const inputBase =
    "w-full mt-1 px-4 py-1.5 border border-gray-300 bg-white text-gray-700 " +
    "focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all " +
    "placeholder-gray-400";

const labelBase = "block text-sm font-medium text-gray-700 mb-1";
const errorBase = "text-sm text-red-500 mt-1";

export default function PropertyRequest({isAdmin, users}) {
    const { data, setData, post, processing, errors } = useForm({
        type_of_sale: '',
        user_id: '',
        property_type: '',
        property_category: '',
        city: '',
        street: '',
        latitude: '',
        longitude: '',
        zone_radious: '',
        surface: '',
        surface_2: '',
        price: '',
        price_2: '',
        currency: 'EUR',
        description: '',
        total_rooms: '',
        total_rooms_2: '',
        total_bathrooms: '',
        total_bathrooms_2: '',
        total_balconies: '',
        total_balconies_2: '',
        floor_number: '',
        total_floors: '',
        year_built: '',
        ashensor: false,
        hipoteke: false,
        interior_design: false,
        architect: false,
    });
    const [zoneRadius, setZoneRadius] = useState(500);
    const STEP = 1;
    const MIN = 0;
    const MAX = 5;
    const [coords,setCoords ] = useState({lat:null,lng:null});
    const [selectedBashki, setSelectedBashki] = useState(null);
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
            { value: ['total_rooms', 'total_rooms_2'], data: [data.total_rooms || MIN, data.total_rooms_2 || MAX], type: 'range', label: 'Numri i dhomave', placeholder: 'p.sh. 3' },
            { value: ['total_bathrooms', 'total_bathrooms_2'], data: [data.total_bathrooms || MIN, data.total_bathrooms_2 || MAX], type: 'range', label: 'Numri i Banjove', placeholder: 'p.sh. 1' },
            { value: ['total_balconies', 'total_balconies_2'], data: [data.total_balconies || MIN, data.total_balconies_2 || MAX], type: 'range', label: 'Numri i Ballkoneve', placeholder: 'p.sh. 2' },
            { value: 'floor_number', type: 'number', label: 'Kati', placeholder: 'p.sh. 5' },
        ],

        house: [
            { value: ['total_rooms', 'total_rooms_2'], data: [data.total_rooms || MIN, data.total_rooms_2 || MAX], type: 'range', label: 'Numri i dhomave', placeholder: 'p.sh. 5' },
            { value: ['total_bathrooms', 'total_bathrooms_2'], data: [data.total_bathrooms || MIN, data.total_bathrooms_2 || MAX], type: 'range', label: 'Numri i Banjove', placeholder: 'p.sh. 2' },
            { value: 'total_floors', type: 'number', label: 'Numri i Kateve të Ndërtimit', placeholder: 'p.sh. 3' },
            { value: ['total_balconies', 'total_balconies_2'], data: [data.total_balconies || MIN, data.total_balconies_2 || MAX], type: 'range', label: 'Numri i Ballkoneve', placeholder: 'p.sh. 1' },
        ],

        office: [
            { value: 'floor_number', type: 'number', label: 'Kati', placeholder: 'p.sh. 2' },
        ],
    }

    const renderDynamicFields = (selectedSubtype, data, setData) => {
        if (!selectedSubtype || !dynamicFieldsMap[selectedSubtype]) {
            return null;
        }

        return dynamicFieldsMap[selectedSubtype].map((field) => {
            const isYearBuilt = field.value === "year_built";

            return (
                <div key={field.value}>
                    <label className={labelBase}>
                        {field.label}
                    </label>
                    {field.type === 'range' &&
                        <div className="mb-2">
                            <Range
                                step={STEP}
                                min={MIN}
                                max={MAX}
                                values={field.data}
                                onChange={(newValues) => {
                                    setData(field.value[0], newValues[0]);
                                    setData(field.value[1], newValues[1]);
                                }}
                                renderTrack={({ props, children }) => (
                                    <div
                                        {...props}
                                        className="h-2 w-full bg-gray-300 rounded relative"
                                        style={{ ...props.style }}
                                    >
                                        <div
                                            className="absolute h-2 bg-blue-500 rounded"
                                            style={{
                                                left: `${((field.data[0] - MIN) / (MAX - MIN)) * 100}%`,
                                                width: `${((field.data[1] - field.data[0]) / (MAX - MIN)) * 100}%`,
                                            }}
                                        />
                                        {children}
                                    </div>
                                )}
                                renderThumb={({ props }) => (
                                    <div
                                        {...props}
                                        className="h-5 w-5 bg-blue-600 rounded-full border-2 border-white shadow-md"
                                    />
                                )}
                            />

                            <div className="flex justify-between text-sm mt-1">
                                <span>{field.data[0].toLocaleString()} </span>
                                <span>{field.data[1].toLocaleString()} </span>
                            </div>

                            {errors.total_rooms && <p className="text-sm text-red-500 mt-1">{errors.total_rooms}</p>}
                            {errors.total_rooms_2 && <p className="text-sm text-red-500 mt-1">{errors.total_rooms_2}</p>}
                        </div>
                    }
                    {field.type !== 'range' &&
                        <>
                        <input
                        type={field.type}
                        value={data[field.value] || ""}
                        placeholder={field.placeholder || ""}
                        onChange={(e) => setData(field.value, e.target.value)}
                        {...(isYearBuilt ? { min: 1900, max: 2050 } : {})}
                        className={inputBase}
                        />
                        <ErrorText field={field.value} errors={errors}/>
                        </>
                    }
                </div>
            );
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        post('/property/request');
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
                    Shto Kerkese të Re
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 opacity-0 animate-fade-in"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>

                            {isAdmin && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Zgjidh Përdoruesin
                                    </label>
                                    <AsyncSelect
                                        cacheOptions
                                        loadOptions={loadUserOptions}
                                        defaultOptions={users.map(user => ({
                                            value: user.id,
                                            label: `${user.name} ${user.surname}`,
                                        }))}
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
                                value={selectedBashki}
                                onChange={(selected) => {
                                    setSelectedBashki(selected);
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
                            <label className={labelBase}>Sipërfaqja *</label>
                            <SurfaceRange data={data} setData={setData} errors={errors} />

                            <ErrorText field="surface" errors={errors} />
                        </div>
                        <div>
                            <label className={labelBase}>Çmimi *</label>
                            <div className="grid grid-cols-1 gap-4items-center">
                                <PriceRange data={data} setData={setData} errors={errors} />
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
                        Shto Kerkesen
                    </button>
                </form>
            </main>
        </div>
    );
}
