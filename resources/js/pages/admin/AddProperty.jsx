import { useForm } from '@inertiajs/react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import React, { useState } from 'react';
import locations from '../../../data/locations.json';
import MapPicker from '../../components/MapPicker.jsx';
import toast from 'react-hot-toast';
import ErrorText from '../../components/ErrorText.jsx';
import { Box, Button } from '@mui/material';
import { router } from '@inertiajs/react';

const inputBase =
    'w-full mt-1 px-4 py-1.5 border border-gray-300 bg-white text-gray-700 ' +
    'focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all ' +
    'placeholder-gray-400';

const labelBase = 'block text-sm font-medium text-gray-700 mb-1';

export default function AddProperty({ users = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: '',
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
        virtual_tour_done: false,
        rivleresim_done: false,
        hipoteke_file: [],
        verified: false,
        mobilim: false,
        parkim: false,
        price_negotiable: false,
    });

    const [coords, setCoords] = useState({ lat: null, lng: null });
    const [selectedBashki, setSelectedBashki] = useState(null);
    const [images, setImages] = useState([]);

    const MAX_FILES = 10;
    const MAX_SIZE_MB = 5;

    const saleOptions = [
        { value: '', label: 'Zgjidh Llojin e Transaksionit' },
        { value: 'sale', label: 'Shitje' },
        { value: 'rent', label: 'Qira' },
    ];

    function handleImages(files) {
        const arr = Array.from(files);
        const newImages = [];

        arr.forEach(file => {
            if (file.size > MAX_SIZE_MB * 1024 * 1024) {
                return toast.error(`Foto "${file.name}" është më e madhe se ${MAX_SIZE_MB}MB`);
            }

            newImages.push({
                file,
                preview: URL.createObjectURL(file),
            });
        });

        const combined = [...images, ...newImages];

        if (combined.length > MAX_FILES) {
            return toast.error(`Maksimumi lejohet ${MAX_FILES} foto`);
        }

        setImages(combined);
        setData('images', combined.map(item => item.file));
        toast.success('Fotot u ngarkuan!');
    }

    function removeImage(index) {
        const updated = images.filter((_, i) => i !== index);
        setImages(updated);
        setData('images', updated.map(item => item.file));
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
            { value: 'total_rooms', type: 'number', label: 'Numri i Dhomave', placeholder: 'p.sh. 3' },
            { value: 'total_bathrooms', type: 'number', label: 'Numri i Banjove', placeholder: 'p.sh. 1' },
            { value: 'total_balconies', type: 'number', label: 'Numri i Ballkoneve', placeholder: 'p.sh. 2' },
            { value: 'floor_number', type: 'number', label: 'Kati', placeholder: 'p.sh. 5' },
            { value: 'year_built', type: 'number', label: 'Viti i Ndërtimit', placeholder: 'p.sh. 2008' },
        ],
        house: [
            { value: 'total_rooms', type: 'number', label: 'Numri i Dhomave', placeholder: 'p.sh. 5' },
            { value: 'total_bathrooms', type: 'number', label: 'Numri i Banjove', placeholder: 'p.sh. 2' },
            { value: 'total_floors', type: 'number', label: 'Numri i Kateve të Ndërtimit', placeholder: 'p.sh. 3' },
            { value: 'year_built', type: 'number', label: 'Viti i Ndërtimit', placeholder: 'p.sh. 1995' },
            { value: 'total_balconies', type: 'number', label: 'Numri i Ballkoneve', placeholder: 'p.sh. 1' },
        ],
        office: [{ value: 'floor_number', type: 'number', label: 'Kati', placeholder: 'p.sh. 2' }],
    };

    const renderDynamicFields = (selectedSubtype, data, setData) => {
        if (!selectedSubtype || !dynamicFieldsMap[selectedSubtype]) {
            return null;
        }

        return dynamicFieldsMap[selectedSubtype].map(field => {
            const isYearBuilt = field.value === 'year_built';
            return (
                <div key={field.value}>
                    <label className={labelBase}>{field.label}</label>
                    <input
                        type={field.type}
                        value={data[field.value] || ''}
                        placeholder={field.placeholder || ''}
                        onChange={e => setData(field.value, e.target.value)}
                        {...(isYearBuilt ? { min: 1900, max: 2050 } : {})}
                        className={inputBase}
                    />
                    <ErrorText field={field.value} errors={errors} />
                </div>
            );
        });
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

    const handleSubmit = e => {
        e.preventDefault();
        post('/admin/properties', {
            forceFormData: true
        });
    };

    return (
        <div className="pt-5 bg-gray-50 min-h-screen">
            <Box sx={{ mx: { xs: 2, sm: 10, md: 20 }, mt: 2, mb: 3 }}>
                <Button
                    variant="outlined"
                    onClick={() => router.get('/admin/properties')}
                >
                    ← Kthehu tek Pronat
                </Button>
            </Box>

            <main className="max-w-4xl mx-auto px-1 pb-20">
                <h1 className="text-3xl font-bold mb-5 pt-4 text-gray-800">
                    Shto Pronë të Re (Admin)
                </h1>

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    {/* USER SELECTION */}
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <label className={labelBase}>Zgjidh Përdoruesin (Pronari) *</label>
                        <AsyncSelect
                            cacheOptions
                            loadOptions={loadUserOptions}
                            defaultOptions={users.map(user => ({
                                value: user.id,
                                label: `${user.name} ${user.surname}`,
                            }))}
                            value={
                                data.user_id
                                    ? users.find(user => user.id === data.user_id)
                                        ? {
                                            value: data.user_id,
                                            label: `${users.find(user => user.id === data.user_id).name} ${users.find(user => user.id === data.user_id).surname}`
                                        }
                                        : null
                                    : null
                            }
                            onChange={(option) => setData('user_id', option ? option.value : '')}
                            placeholder="Kërko përdoruesin..."
                            classNamePrefix="react-select"
                            isClearable
                        />
                        <ErrorText field="user_id" errors={errors} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className={labelBase}>Lloji i Transaksionit *</label>
                            <Select
                                name="type_of_sale"
                                value={saleOptions.find(o => o.value === data.type_of_sale) || null}
                                onChange={selected => setData('type_of_sale', selected ? selected.value : '')}
                                options={saleOptions}
                                placeholder="Zgjidh llojin"
                                classNamePrefix="react-select"
                            />
                            <ErrorText field="type_of_sale" errors={errors} />
                        </div>

                        <div>
                            <label className={labelBase}>Lloji i Pronës *</label>
                            <Select
                                name="property_type"
                                value={typeOfProperties.find(o => o.value === data.property_type) || null}
                                onChange={selected => {
                                    setData('property_type', selected ? selected.value : '');
                                    setData('property_category', '');
                                }}
                                options={typeOfProperties}
                                placeholder="Zgjidh llojin"
                                classNamePrefix="react-select"
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
                                classNamePrefix="react-select"
                            />
                            <ErrorText field="property_category" errors={errors} />
                        </div>

                        <div>
                            <label className={labelBase}>Qyteti *</label>
                            <Select
                                value={selectedBashki}
                                onChange={selected => {
                                    setSelectedBashki(selected);
                                    setData('city', selected ? selected.label : '');
                                }}
                                menuPortalTarget={document.body}
                                options={locations.cities}
                                placeholder="Zgjidh Bashkinë"
                                classNamePrefix="react-select"
                                isDisabled={!locations.cities.length}
                            />
                            <ErrorText field="city" errors={errors} />
                        </div>

                        <div className="mt-4">
                            <label className={labelBase}>Vendndodhja në hartë *</label>
                            <MapPicker
                                lat={coords.lat}
                                lng={coords.lng}
                                onSelect={location => {
                                    console.log('Selected location:', location);
                                    setCoords({ lat: location.lat, lng: location.lng });
                                    setData('latitude', location.lat);
                                    setData('longitude', location.lng);
                                    setData('street', location.road);
                                }}
                            />
                            <ErrorText field="latitude" errors={errors} />
                        </div>

                        <div>
                            <label className={labelBase}>Sipërfaqja *</label>
                            <input
                                className={inputBase}
                                name="surface"
                                type="number"
                                value={data.surface}
                                onChange={e => setData('surface', e.target.value)}
                                placeholder="Sipërfaqja në m²"
                                autoComplete="off"
                            />
                            <ErrorText field="surface" errors={errors} />
                        </div>

                        <div>
                            <label className={labelBase}>Çmimi *</label>
                            <div className="flex items-center gap-2">
                                <input
                                    className={inputBase}
                                    type="number"
                                    value={data.price}
                                    onChange={e => setData('price', e.target.value)}
                                    placeholder="Çmimi"
                                    autoComplete="off"
                                />
                                <Select
                                    name="currency"
                                    className="mt-1 min-w-24"
                                    value={data.currency ? { value: data.currency, label: data.currency } : { value: 'EUR', label: 'EUR' }}
                                    onChange={selected => setData('currency', selected ? selected.value : '')}
                                    options={[
                                        { value: 'EUR', label: 'EUR' },
                                        { value: 'USD', label: 'USD' },
                                        { value: 'ALL', label: 'ALL' },
                                    ]}
                                    classNamePrefix="react-select"
                                />
                            </div>
                            <ErrorText field="price" errors={errors} />
                            <label className="flex items-center gap-3 mb-2">
                                <input
                                    type="checkbox"
                                    checked={data.price_negotiable}
                                    onChange={e => setData('price_negotiable', e.target.checked)}
                                />
                                <span className="text-gray-700">Çmimi i negociueshëm</span>
                            </label>
                        </div>

                        {renderDynamicFields(data.property_category, data, setData)}

                        <div>
                            <label className={labelBase}>Imazhe *</label>
                            <input type="file" multiple accept="image/*" onChange={e => handleImages(e.target.files)} />
                            {images.length < 2 && (
                                <p className="text-red-500 text-sm mt-1">Duhet të ngarkoni të paktën 2 foto.</p>
                            )}
                            <ErrorText field="images" errors={errors} />

                            <div className="grid grid-cols-3 gap-3 mt-4">
                                {images.map((img, index) => (
                                    <div key={index} className="relative group">
                                        <img src={img.preview} className="w-full h-24 object-cover rounded-lg border" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center opacity-80 hover:opacity-100"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className={labelBase}>Virtual Tour Link (opsional)</label>
                        <input
                            className={inputBase}
                            type="url"
                            value={data.virtual_tour_link}
                            onChange={e => setData('virtual_tour_link', e.target.value)}
                            placeholder="https://..."
                        />
                        <ErrorText field="virtual_tour_link" errors={errors} />
                    </div>

                    <div className="mt-4">
                        <label className={labelBase}>Plani i Katit (opsional)</label>
                        <input
                            type="file"
                            accept=".pdf,image/*"
                            onChange={e => setData('floor_plan', e.target.files[0])}
                            className="mt-1"
                        />
                        <p className="text-xs text-gray-500 mt-1">Lejohet PDF ose foto (maks 5MB)</p>
                        <ErrorText field="floor_plan" errors={errors} />
                    </div>

                    <div className="mt-4">
                        <label className={labelBase}>Hipotekë (opsional)</label>
                        <input
                            type="file"
                            accept=".pdf,image/*"
                            onChange={e => setData('hipoteke_file', e.target.files[0])}
                            className="mt-1"
                        />
                        <p className="text-xs text-gray-500 mt-1">Lejohet maks 5MB</p>
                        <ErrorText field="hipoteke_file" errors={errors} />
                    </div>

                    <div className="mt-6">
                        <label className={labelBase}>Përshkrimi</label>
                        <textarea
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            className={inputBase + ' h-32 resize-none'}
                            placeholder="Shkruani detaje të pronës..."
                        />
                        <ErrorText field="description" errors={errors} />
                    </div>

                    <div className="mt-6 bg-gray-50 p-4 rounded-xl border">
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Detaje Ekstra</h3>

                        <label className="flex items-center gap-3 mb-2">
                            <input
                                type="checkbox"
                                checked={data.ashensor}
                                onChange={e => setData('ashensor', e.target.checked)}
                            />
                            <span className="text-gray-700">Ka ashensor</span>
                        </label>

                        <label className="flex items-center gap-3 mb-2">
                            <input
                                type="checkbox"
                                checked={data.hipoteke}
                                onChange={e => setData('hipoteke', e.target.checked)}
                            />
                            <span className="text-gray-700">Ka hipotekë</span>
                        </label>
                        <label className="flex items-center gap-3 mb-2">
                            <input
                                type="checkbox"
                                checked={data.mobilim}
                                onChange={e => setData('mobilim', e.target.checked)}
                            />
                            <span className="text-gray-700">Përfshirë mobilimi</span>
                        </label>

                        <label className="flex items-center gap-3 mb-2">
                            <input
                                type="checkbox"
                                checked={data.parkim}
                                onChange={e => setData('parkim', e.target.checked)}
                            />
                            <span className="text-gray-700">Përfshirë vendi i parkimit</span>
                        </label>
                    </div>

                    <div className="mt-6 bg-gray-50 p-4 rounded-xl border">
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">Shërbime Ekstra</h3>

                        <label className="flex items-center gap-3 mb-2">
                            <input
                                type="checkbox"
                                checked={data.virtual_tour}
                                onChange={e => setData('virtual_tour', e.target.checked)}
                            />
                            <span className="text-gray-700">Kërkesë për Virtual Tour</span>
                        </label>

                        <label className="flex items-center gap-3 mb-2">
                            <input
                                type="checkbox"
                                checked={data.virtual_tour_done}
                                onChange={e => setData('virtual_tour_done', e.target.checked)}
                            />
                            <span className="text-gray-700">Virtual Tour i Kryer</span>
                        </label>

                        <label className="flex items-center gap-3 mb-2">
                            <input
                                type="checkbox"
                                checked={data.rivleresim}
                                onChange={e => setData('rivleresim', e.target.checked)}
                            />
                            <span className="text-gray-700">Kërkesë për Rivlerësim</span>
                        </label>

                        <label className="flex items-center gap-3 mb-2">
                            <input
                                type="checkbox"
                                checked={data.rivleresim_done}
                                onChange={e => setData('rivleresim_done', e.target.checked)}
                            />
                            <span className="text-gray-700">Rivlerësimi i Kryer</span>
                        </label>

                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={data.combo_package}
                                onChange={e => setData('combo_package', e.target.checked)}
                            />
                            <span className="text-gray-700">Kërkesë për Paketë Kombinuar</span>
                        </label>
                    </div>

                    <div className="mt-6 bg-green-50 p-4 rounded-xl border border-green-200">
                        <label className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={data.verified}
                                onChange={e => setData('verified', e.target.checked)}
                            />
                            <span className="text-gray-700 font-semibold">Verifiko Pronën</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="mt-8 w-full py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-md hover:shadow-xl disabled:opacity-50"
                    >
                        {processing ? 'Duke shtuar...' : 'Shto Pronën'}
                    </button>
                </form>
            </main>
        </div>
    );
}
