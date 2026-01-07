import { useState } from "react";

const PropertyFilter = ({
                            filters,
                            setFilters,
                            onApply,
                        }) => {
    const [open, setOpen] = useState(false);

    const update = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
        }));
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

    return (
        <div className="bg-white shadow px-4 pb-4 rounded-xl mb-4">
            <h4 className="pb-4 text-2xl font-bold">Kërko Pronat</h4>

            {/* Search */}
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Qytet, zonë, rrugë..."
                    value={filters.search}
                    onChange={e => update("search", e.target.value)}
                    className="flex-grow border rounded-lg p-3"
                />

                <button
                    onClick={onApply}
                    className="px-5 bg-blue-500 text-white rounded-lg"
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
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">

                        <h3 className="font-bold text-lg mb-4">Filtra të Avancuar</h3>

                        {/* PRICE RANGE */}
                        <div className="mb-4">
                            <label className="font-semibold">Intervali i Çmimit</label>
                            <div className="flex gap-2 mt-2">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={filters.min_price}
                                    onChange={e => update("min_price", e.target.value)}
                                    className="border rounded-lg p-2 w-full"
                                />
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={filters.max_price}
                                    onChange={e => update("max_price", e.target.value)}
                                    className="border rounded-lg p-2 w-full"
                                />
                            </div>
                        </div>

                        {/* CURRENCY */}
                        <div className="mb-4">
                            <label className="font-semibold">Monedha</label>
                            <select
                                value={filters.currency}
                                onChange={e => update("currency", e.target.value)}
                                className="w-full border rounded-lg p-2 mt-1"
                            >
                                <option value="EUR">EUR</option>
                                <option value="ALL">ALL</option>
                                <option value="USD">USD</option>
                            </select>
                        </div>

                        {/* SALE / RENT */}
                        <div className="mb-4">
                            <label className="font-semibold">Lloji</label>
                            <select
                                value={filters.sale_type}
                                onChange={e => update("sale_type", e.target.value)}
                                className="w-full border rounded-lg p-2 mt-1"
                            >
                                <option value="">Çdo</option>
                                <option value="sale">Shitje</option>
                                <option value="rent">Qira</option>
                            </select>
                        </div>

                        {/* PROPERTY TYPE (checkboxes) */}
                        <div className="mb-4">
                            <label className="font-semibold">Lloji i Pronës</label>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {["Apartament", "Shtëpi", "Vilë", "Komerciale"].map((t, i) => (
                                    <label key={t} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={filters.types?.includes(
                                                ["Apartment", "House", "Villa", "Commercial"][i]
                                            )}
                                            onChange={() => toggleArray("types", ["Apartment", "House", "Villa", "Commercial"][i])}
                                        />
                                        {t}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* CHARACTERISTICS */}
                        <div className="mb-4">
                            <label className="font-semibold">Karakteristika</label>
                            <div className="flex gap-4 mt-2">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.elevator}
                                        onChange={e => update("elevator", e.target.checked)}
                                    />
                                    Ashensor
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.mortgage}
                                        onChange={e => update("mortgage", e.target.checked)}
                                    />
                                    Hipotekë
                                </label>
                            </div>
                        </div>

                        {/* RANGES */}
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="number"
                                placeholder="Min dhoma"
                                value={filters.rooms_min}
                                onChange={e => update("rooms_min", e.target.value)}
                                className="border rounded-lg p-2"
                            />

                            <input
                                type="number"
                                placeholder="Max dhoma"
                                value={filters.rooms_max}
                                onChange={e => update("rooms_max", e.target.value)}
                                className="border rounded-lg p-2"
                            />

                            <input
                                type="number"
                                placeholder="Min banjo"
                                value={filters.bathrooms_min}
                                onChange={e => update("bathrooms_min", e.target.value)}
                                className="border rounded-lg p-2"
                            />

                            <input
                                type="number"
                                placeholder="Max banjo"
                                value={filters.bathrooms_max}
                                onChange={e => update("bathrooms_max", e.target.value)}
                                className="border rounded-lg p-2"
                            />

                            <input
                                type="number"
                                placeholder="Min sipërfaqe m²"
                                value={filters.surface_min}
                                onChange={e => update("surface_min", e.target.value)}
                                className="border rounded-lg p-2"
                            />

                            <input
                                type="number"
                                placeholder="Max sipërfaqe m²"
                                value={filters.surface_max}
                                onChange={e => update("surface_max", e.target.value)}
                                className="border rounded-lg p-2"
                            />

                            <input
                                type="number"
                                placeholder="Min ballkone"
                                value={filters.balconies_min}
                                onChange={e => update("balconies_min", e.target.value)}
                                className="border rounded-lg p-2"
                            />

                            <input
                                type="number"
                                placeholder="Max ballkone"
                                value={filters.balconies_max}
                                onChange={e => update("balconies_max", e.target.value)}
                                className="border rounded-lg p-2"
                            />
                        </div>

                        {/* ACTIONS */}
                        <div className="flex justify-end gap-3 mt-6">
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

export default PropertyFilter;
