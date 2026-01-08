import React, { useState } from "react";
import AsyncSelect from 'react-select/async';

const PropertyFilterModal = ({ filters, setFilters, onApply, users = [] }) => {
    const [open, setOpen] = useState(false);

    const update = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const subTypeProperties = {
        Rezidenciale: [
            { value: 'apartment', label: 'Apartament' },
            { value: 'house', label: 'Shtëpi Private' },
            { value: 'kategori te tjera', label: 'Kategori të tjera' },
        ],
        Komerciale: [
            { value: 'office', label: 'Zyrë' },
            { value: 'warehouse', label: 'Magazinë' },
        ],
        Tokë: [
            { value: 'agricultural', label: 'Tokë Bujqësore' },
            { value: 'truall', label: 'Truall' },
        ],
        Tjera: [
            { value: 'parkim', label: 'Parkim' },
            { value: 'kategori_te_tjera', label: 'Kategori të tjera' },
        ],
    };

    const toggleArray = (key, value) => {
        setFilters(prev => {
            const arr = prev[key] || [];
            return {
                ...prev,
                [key]: arr.includes(value)
                    ? arr.filter(v => v !== value)
                    : [...arr, value],
            };
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

    return (
        <div className="bg-white shadow px-4 pb-4 rounded-xl mb-4">
            <h4 className="pb-4 text-2xl font-bold">Kërko</h4>

            <div className="grid gap-2">
                <input
                    type="text"
                    placeholder="Qytet, zonë, rrugë..."
                    value={filters.search || ''}
                    onChange={e => update("search", e.target.value)}
                    className="border rounded-lg p-3 w-full"
                />

                <button
                    onClick={onApply}
                    className="w-full bg-blue-500 text-white rounded-lg p-3"
                >
                    Kërko
                </button>
            </div>

            <button
                onClick={() => setOpen(true)}
                className="mt-3 underline text-sm"
            >
                Më shumë filtra
            </button>

            {/* MODAL */}
            {open && (
                <div className="fixed inset-0 bg-black/40 grid items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <h3 className="font-bold text-lg mb-4">Filtra të Avancuar</h3>

                        {/* USER FILTER */}
                        {users.length > 0 && (
                            <div className="mb-4">
                                <label className="font-semibold block mb-2">Zgjidh Përdoruesin</label>
                                <AsyncSelect
                                    cacheOptions
                                    loadOptions={loadUserOptions}
                                    defaultOptions={users.map(user => ({
                                        value: user.id,
                                        label: `${user.name} ${user.surname}`,
                                    }))}
                                    value={
                                        filters.user_id
                                            ? users.find(user => user.id === filters.user_id)
                                                ? {
                                                    value: filters.user_id,
                                                    label: `${users.find(user => user.id === filters.user_id).name} ${users.find(user => user.id === filters.user_id).surname}`
                                                }
                                                : null
                                            : null
                                    }
                                    onChange={(option) => update("user_id", option ? option.value : '')}
                                    placeholder="Kërko përdoruesin..."
                                    classNamePrefix="react-select"
                                    isClearable
                                />
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="font-semibold block mb-2">Statusi i Verifikimit</label>
                            <select
                                value={filters.verified ?? ''}
                                onChange={e => update("verified", e.target.value)}
                                className="w-full border rounded-lg p-2"
                            >
                                <option value="">Të gjitha</option>
                                <option value="1">E Verifikuar</option>
                                <option value="0">E Paverifikuar</option>
                            </select>
                        </div>
                        {/* SERVICE REQUESTS */}
                        <div className="mb-4">
                            <label className="font-semibold block mb-2">Shërbimet e Kërkuara</label>
                            <div className="grid gap-2">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.virtual_tour || false}
                                        onChange={e => update("virtual_tour", e.target.checked)}
                                    />
                                    Ka kërkuar Tur Virtual
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.rivleresim || false}
                                        onChange={e => update("rivleresim", e.target.checked)}
                                    />
                                    Ka kërkuar Rivlerësim
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.combo_package || false}
                                        onChange={e => update("combo_package", e.target.checked)}
                                    />
                                    Ka kërkuar Paketë Kombinuar
                                </label>
                            </div>
                        </div>

                        {/* SERVICE COMPLETION STATUS */}
                        <div className="mb-4">
                            <label className="font-semibold block mb-2">Statusi i Shërbimeve</label>
                            <div className="grid gap-2">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.virtual_tour_done || false}
                                        onChange={e => update("virtual_tour_done", e.target.checked)}
                                    />
                                    Tur Virtual i kryer
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.rivleresim_done || false}
                                        onChange={e => update("rivleresim_done", e.target.checked)}
                                    />
                                    Rivlerësimi i kryer
                                </label>
                            </div>
                        </div>

                        {/* PRICE RANGE */}
                        <div className="mb-4">
                            <label className="font-semibold block mb-2">Intervali i Çmimit</label>
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={filters.min_price || ''}
                                    onChange={e => update("min_price", e.target.value)}
                                    className="border rounded-lg p-2 w-full"
                                />
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={filters.max_price || ''}
                                    onChange={e => update("max_price", e.target.value)}
                                    className="border rounded-lg p-2 w-full"
                                />
                            </div>
                        </div>

                        {/* CURRENCY */}
                        <div className="mb-4">
                            <label className="font-semibold block mb-2">Monedha</label>
                            <select
                                value={filters.currency || 'EUR'}
                                onChange={e => update("currency", e.target.value)}
                                className="w-full border rounded-lg p-2"
                            >
                                <option value="EUR">EUR</option>
                                <option value="ALL">ALL</option>
                                <option value="USD">USD</option>
                            </select>
                        </div>

                        {/* SALE / RENT */}
                        <div className="mb-4">
                            <label className="font-semibold block mb-2">Lloji</label>
                            <select
                                value={filters.sale_type || ''}
                                onChange={e => update("sale_type", e.target.value)}
                                className="w-full border rounded-lg p-2"
                            >
                                <option value="">Çdo</option>
                                <option value="sale">Shitje</option>
                                <option value="rent">Qira</option>
                            </select>
                        </div>

                        {/* PROPERTY TYPE */}
                        <div className="mb-4">
                            <label className="font-semibold block mb-2">Lloji i Pronës</label>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {Object.entries(subTypeProperties).map(([category, subTypes]) => (
                                    <div key={category}>
                                        <h5 className="font-bold mb-2">{category}</h5>
                                        {subTypes.map(subType => (
                                            <label key={subType.value} className="flex items-center gap-2 mb-1">
                                                <input
                                                    type="checkbox"
                                                    checked={filters.types?.includes(subType.value) || false}
                                                    onChange={() => toggleArray("types", subType.value)}
                                                />
                                                {subType.label}
                                            </label>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CHARACTERISTICS */}
                        <div className="mb-4">
                            <label className="font-semibold block mb-2">Karakteristika</label>
                            <div className="grid gap-2">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.elevator || false}
                                        onChange={e => update("elevator", e.target.checked)}
                                    />
                                    Ashensor
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.mortgage || false}
                                        onChange={e => update("mortgage", e.target.checked)}
                                    />
                                    Hipotekë
                                </label>
                            </div>
                        </div>

                        {/* RANGES */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            <input
                                type="number"
                                placeholder="Min dhoma"
                                value={filters.rooms_min || ''}
                                onChange={e => update("rooms_min", e.target.value)}
                                className="border rounded-lg p-2"
                            />
                            <input
                                type="number"
                                placeholder="Max dhoma"
                                value={filters.rooms_max || ''}
                                onChange={e => update("rooms_max", e.target.value)}
                                className="border rounded-lg p-2"
                            />
                            <input
                                type="number"
                                placeholder="Min banjo"
                                value={filters.bathrooms_min || ''}
                                onChange={e => update("bathrooms_min", e.target.value)}
                                className="border rounded-lg p-2"
                            />
                            <input
                                type="number"
                                placeholder="Max banjo"
                                value={filters.bathrooms_max || ''}
                                onChange={e => update("bathrooms_max", e.target.value)}
                                className="border rounded-lg p-2"
                            />
                            <input
                                type="number"
                                placeholder="Min sipërfaqe m²"
                                value={filters.surface_min || ''}
                                onChange={e => update("surface_min", e.target.value)}
                                className="border rounded-lg p-2"
                            />
                            <input
                                type="number"
                                placeholder="Max sipërfaqe m²"
                                value={filters.surface_max || ''}
                                onChange={e => update("surface_max", e.target.value)}
                                className="border rounded-lg p-2"
                            />
                            <input
                                type="number"
                                placeholder="Min ballkone"
                                value={filters.balconies_min || ''}
                                onChange={e => update("balconies_min", e.target.value)}
                                className="border rounded-lg p-2"
                            />
                            <input
                                type="number"
                                placeholder="Max ballkone"
                                value={filters.balconies_max || ''}
                                onChange={e => update("balconies_max", e.target.value)}
                                className="border rounded-lg p-2"
                            />
                        </div>

                        {/* ACTIONS */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setOpen(false)}
                                className="border px-4 py-2 rounded-lg"
                            >
                                Mbyll
                            </button>
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    onApply();
                                }}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                            >
                                Apliko filtrat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyFilterModal;
