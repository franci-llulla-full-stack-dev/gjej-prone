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
            <h4 className="pb-4 text-2xl font-bold">Kerko Prona</h4>

            {/* Search */}
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="City, zone, street..."
                    value={filters.search}
                    onChange={e => update("search", e.target.value)}
                    className="flex-grow border rounded-lg p-3"
                />

                <button
                    onClick={onApply}
                    className="px-5 bg-blue-500 text-white rounded-lg"
                >
                    Search
                </button>
            </div>

            <button
                onClick={() => setOpen(true)}
                className="mt-3 underline text-sm"
            >
                More filters
            </button>

            {/* MODAL */}
            {open && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-3xl
    max-h-[90vh] overflow-y-auto">

                        <h3 className="font-bold text-lg mb-4">Advanced Filters</h3>

                        {/* PRICE RANGE */}
                        <div className="mb-4">
                            <label className="font-semibold">Price range</label>
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
                            <label className="font-semibold">Currency</label>
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
                            <label className="font-semibold">Type</label>
                            <select
                                value={filters.sale_type}
                                onChange={e => update("sale_type", e.target.value)}
                                className="w-full border rounded-lg p-2 mt-1"
                            >
                                <option value="">Any</option>
                                <option value="sale">Sale</option>
                                <option value="rent">Rent</option>
                            </select>
                        </div>

                        {/* PROPERTY TYPE (checkboxes) */}
                        <div className="mb-4">
                            <label className="font-semibold">Property Type</label>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {["Apartment", "House", "Villa", "Commercial"].map(t => (
                                    <label key={t} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={filters.types?.includes(t)}
                                            onChange={() => toggleArray("types", t)}
                                        />
                                        {t}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* CHARACTERISTICS */}
                        <div className="mb-4">
                            <label className="font-semibold">Characteristics</label>
                            <div className="flex gap-4 mt-2">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.elevator}
                                        onChange={e => update("elevator", e.target.checked)}
                                    />
                                    Elevator
                                </label>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.mortgage}
                                        onChange={e => update("mortgage", e.target.checked)}
                                    />
                                    Mortgage
                                </label>
                            </div>
                        </div>

                        {/* RANGES */}
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="number"
                                placeholder="Min rooms"
                                value={filters.rooms_min}
                                onChange={e => update("rooms_min", e.target.value)}
                                className="border rounded-lg p-2"
                            />

                            <input
                                type="number"
                                placeholder="Max rooms"
                                value={filters.rooms_max}
                                onChange={e => update("rooms_max", e.target.value)}
                                className="border rounded-lg p-2"
                            />

                            <input
                                type="number"
                                placeholder="Min bathrooms"
                                value={filters.bathrooms_min}
                                onChange={e => update("bathrooms_min", e.target.value)}
                                className="border rounded-lg p-2"
                            />

                            <input
                                type="number"
                                placeholder="Max bathrooms"
                                value={filters.bathrooms_max}
                                onChange={e => update("bathrooms_max", e.target.value)}
                                className="border rounded-lg p-2"
                            />

                            <input
                                type="number"
                                placeholder="Min surface m²"
                                value={filters.surface_min}
                                onChange={e => update("surface_min", e.target.value)}
                                className="border rounded-lg p-2"
                            />

                            <input
                                type="number"
                                placeholder="Max surface m²"
                                value={filters.surface_max}
                                onChange={e => update("surface_max", e.target.value)}
                                className="border rounded-lg p-2"
                            />

                            <input
                                type="number"
                                placeholder="Min balconies"
                                value={filters.balconies_min}
                                onChange={e => update("balconies_min", e.target.value)}
                                className="border rounded-lg p-2"
                            />

                            <input
                                type="number"
                                placeholder="Max balconies"
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
                                Close
                            </button>

                            <button
                                onClick={() => {
                                    setOpen(false);
                                    onApply();
                                }}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                            >
                                Apply filters
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyFilter;
