import { useForm } from '@inertiajs/react';
import Select from 'react-select';
import React, { useState, useEffect } from 'react';
import locations from '../../data/locations.json';
import MapPicker from '../components/MapPicker.jsx';
import toast from "react-hot-toast";
import ErrorText from '../components/ErrorText.jsx';

const inputBase =
    "w-full mt-1 px-4 py-1.5 border border-gray-300 bg-white text-gray-700 " +
    "focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all " +
    "placeholder-gray-400";

const labelBase = "block text-sm font-medium text-gray-700 mb-1";
const errorBase = "text-sm text-red-500 mt-1";

export default function NewProperty() {
    const { data, setData, post, processing, errors } = useForm({
        type_of_sale: '',
        property_type: '',
        property_category: '',
        city: '',
        street: '',
        surface: '',
        price: '',
        ashensor: false,
        hipoteke: false,
        floor_plan: [],
        currency: 'EUR',
        description: '',
        total_rooms: '',
        total_bathrooms: '',
        total_balconies: '',
        floor_number: '',
        total_floors: '',
        year_built: '',
        latitude: '',
        longitude: '',
        virtual_tour_link: '',
        images: [],
        virtual_tour: false,
        rivleresim: false,
        combo_package: false,
        hipoteke_file: [],
    });
    const [coords,setCoords ] = useState({lat:null,lng:null});
    const [selectedBashki, setSelectedBashki] = useState(null);
    const [images, setImages] = useState([]);
    const MAX_FILES = 10;
    const MAX_SIZE_MB = 5;
    const saleOptions = [
        { value: '', label: 'Zgjidh Llojin e Transaksionit' },
        { value: 'sale', label: 'Shitje' },
        { value: 'rent', label: 'Qira' }
    ];
    function handleImages(files) {
        const arr = Array.from(files);
        const newImages = [];

        arr.forEach(file => {
            if (file.size > MAX_SIZE_MB * 1024 * 1024) {
                return toast.error(
                    `Foto "${file.name}" eshte me e madhe se ${MAX_SIZE_MB}MB`
                );
            }

            newImages.push({
                file,
                preview: URL.createObjectURL(file)
            });
        });

        const combined = [...images, ...newImages];

        if (combined.length > MAX_FILES) {
            return toast.error(`Maksimumi lejohet ${MAX_FILES} foto`);
        }

        setImages(combined);
        setData("images", combined.map(item => item.file));
        toast.success("Foto u ngarkuan!");
    }
    function removeImage(index) {
        const updated = images.filter((_, i) => i !== index);
        setImages(updated);
        setData("images", updated.map(item => item.file));
    }
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
            { value: 'total_rooms', type: 'number', label: 'Numri i dhomave', placeholder: 'p.sh. 3' },
            { value: 'total_bathrooms', type: 'number', label: 'Numri i Banjove', placeholder: 'p.sh. 1' },
            { value: 'total_balconies', type: 'number', label: 'Numri i Ballkoneve', placeholder: 'p.sh. 2' },
            { value: 'floor_number', type: 'number', label: 'Kati', placeholder: 'p.sh. 5' },
            { value: 'year_built', type: 'number', label: 'Viti i Ndërtimit', placeholder: 'p.sh. 2008' },
        ],

        house: [
            { value: 'total_rooms', type: 'number', label: 'Numri i dhomave', placeholder: 'p.sh. 5' },
            { value: 'total_bathrooms', type: 'number', label: 'Numri i Banjove', placeholder: 'p.sh. 2' },
            { value: 'total_floors', type: 'number', label: 'Numri i Kateve të Ndërtimit', placeholder: 'p.sh. 3' },
            { value: 'year_built', type: 'number', label: 'Viti i Ndërtimit', placeholder: 'p.sh. 1995' },
            { value: 'total_balconies', type: 'number', label: 'Numri i Ballkoneve', placeholder: 'p.sh. 1' },
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

                    <input
                        type={field.type}
                        value={data[field.value] || ""}
                        placeholder={field.placeholder || ""}
                        onChange={(e) => setData(field.value, e.target.value)}
                        {...(isYearBuilt ? { min: 1900, max: 2050 } : {})}
                        className={inputBase}
                    />
                    <ErrorText field={field.value} errors={errors}/>
                </div>
            );
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        post('/properties');
    };

    return (
        <div className="pt-20 bg-gray-50 min-h-screen">

            <main className="max-w-4xl mx-auto px-4 pb-20">
                <h1 className="text-3xl font-bold mb-5 pt-4 text-gray-800 opacity-0 animate-fade-in-up">
                    Shto Pronë të Re
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 opacity-0 animate-fade-in"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                        <div className="mt-4">
                            <label className={labelBase}>Vendndodhja në hartë *</label>

                            <MapPicker
                                lat={coords.lat}
                                lng={coords.lng}
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

                        </div>
                        <div>
                            <label className={labelBase}>Sipërfaqja *</label>
                            <input className={inputBase}
                                name="surface"
                                type="number"
                                value={data.surface}
                                onChange={(e) => setData('surface', e.target.value)}
                                placeholder="Sipërfaqja në m²"
                                autoComplete="off"
                            />
                            <ErrorText field="surface" errors={errors} />
                        </div>
                        <div>
                            <label className={labelBase}>Çmimi *</label>
                            <div className="flex items-center">
                                <input className={inputBase}
                                       type="number"
                                       value={data.price}
                                       onChange={(e) => setData('price', e.target.value)}
                                       placeholder="Çmimi"
                                       autoComplete="off"
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
                        </div>
                        {renderDynamicFields(data.property_category, data, setData)}

                        <div>
                            <label className={labelBase}>Imazhe *</label>

                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => handleImages(e.target.files)}
                            />

                            {images.length < 2 && (
                                <p className="text-red-500 text-sm mt-1">
                                    Duhet te ngarkoni te pakten 2 foto.
                                </p>
                            )}
                            <ErrorText field="images" errors={errors} />
                            {/* Image Preview Grid */}
                            <div className="grid grid-cols-3 gap-3 mt-4">
                                {images.map((img, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={img.preview}
                                            className="w-full h-24 object-cover rounded-lg border"
                                        />

                                        {/* Remove button */}
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full
                               text-xs flex items-center justify-center opacity-80 hover:opacity-100"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className={labelBase}>
                            Plani i Katit (opsional)
                        </label>

                        <input
                            type="file"
                            accept=".pdf,image/*"
                            onChange={(e) => setData('floor_plan', e.target.files[0])}
                            className="mt-1"
                        />

                        <p className="text-xs text-gray-500 mt-1">
                            Lejohet PDF ose foto (max 5MB)
                        </p>

                        <ErrorText field="floor_plan" errors={errors} />
                    </div>
                    <div className="mt-4">
                        <label className={labelBase}>
                            Hipoteke (opsional)
                        </label>

                        <input
                            type="file"
                            accept=".pdf,image/*"
                            onChange={(e) => setData('hipoteke_file', e.target.files[0])}
                            className="mt-1"
                        />

                        <p className="text-xs text-gray-500 mt-1">
                            Lejohet max 5MB
                        </p>

                        <ErrorText field="hipoteke_file" errors={errors} />
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
                                checked={data.virtual_tour}
                                onChange={(e) => {
                                    setData('virtual_tour', e.target.checked);
                                    if (e.target.checked) setData('combo_package', false);
                                }}
                            />
                            <span className="text-gray-700">
                                Dëshiroj Virtual Tour – <strong>150€</strong> (Rankim Gold)
                            </span>
                        </label>

                        {/* 2. Rivlersim */}
                        <label className="flex items-center gap-3 mb-2">
                            <input
                                type="checkbox"
                                checked={data.rivleresim}
                                onChange={(e) => {
                                    setData('rivleresim', e.target.checked);
                                    if (e.target.checked) setData('combo_package', false);
                                }}
                            />
                            <span className="text-gray-700">
                                Dëshiroj Rivleresim – <strong>150€</strong> (Rankim Silver)
                            </span>
                        </label>

                        {/* 3. Combo – të dyja bashkë */}
                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={data.combo_package}
                                onChange={(e) => {
                                    setData('combo_package', e.target.checked);
                                    if (e.target.checked) {
                                        setData('virtual_tour', false);
                                        setData('rivleresim', false);
                                    }
                                }}
                            />
                            <span className="text-gray-700">
                                Dëshiroj të dyja bashkë – <strong>250€</strong> (Rankim Platinum)
                            </span>
                        </label>
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-8 w-full py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-md hover:shadow-xl opacity-0 animate-fade-in-up"
                        style={{ animationDelay: "1s" }}
                    >
                        Shto Pronën
                    </button>
                </form>
            </main>
        </div>
    );
}
