import PropertyItem from '../components/PropertyItem.jsx';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

const Properties = ({properties}) => {
    const [filters, setFilters] = useState({
        search: '',
        city: '',
        min_price: '',
        max_price: '',
        rooms: '',
    });
    const [filterModalOpen, setFilterModalOpen] = useState(false)

    const clearFilter = (key) => {
        setFilters((prev) => ({
            ...prev,
            [key]: '',
        }));
        reloadProperties();
    };

    const handleChange = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const submitSearch = () => {
        reloadProperties();
    };

    const applyFilters = () => {
        setFilterModalOpen(false);
        reloadProperties();
    };

    const reloadProperties = () => {
        router.get('/properties', filters, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <div className="grid grid-cols-1">
                    <div className="bg-white shadow px-4 pb-4 rounded-xl mb-4">
                        <h4 className="pb-4 text-2xl font-bold">Pronat</h4>
                        {/* Search Bar */}
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Search by city, zone, street..."
                                value={filters.search}
                                onChange={(e) => handleChange("search", e.target.value)}
                                className="flex-grow border rounded-lg p-3"
                            />
                            <button
                                onClick={submitSearch}
                                className="px-5 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Search
                            </button>

                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                            <button
                                onClick={() => setFilterModalOpen(true)}
                                className="hover:bg-gray-100 underline"
                            >
                                Show more filters
                            </button>
                            {Object.entries(filters).map(([key, value]) =>
                                    value && key !== "search" ? (
                                        <div
                                            key={key}
                                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2"
                                        >
                    <span>
                        {key.replace("_", " ")}: {value}
                    </span>
                                            <button
                                                onClick={() => clearFilter(key)}
                                                className="text-blue-700 font-bold hover:text-red-600"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ) : null
                            )}
                        </div>
                    </div>
                    {filterModalOpen && (
                        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
                            <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">

                                <h2 className="text-lg font-bold mb-4">More Filters</h2>

                                {/* Min Price */}
                                <div className="mb-3">
                                    <label className="text-sm text-gray-700">Min Price</label>
                                    <input
                                        type="number"
                                        value={filters.min_price}
                                        onChange={(e) => handleChange("min_price", e.target.value)}
                                        className="w-full border rounded-lg p-2 mt-1"
                                    />
                                </div>

                                {/* Max Price */}
                                <div className="mb-3">
                                    <label className="text-sm text-gray-700">Max Price</label>
                                    <input
                                        type="number"
                                        value={filters.max_price}
                                        onChange={(e) => handleChange("max_price", e.target.value)}
                                        className="w-full border rounded-lg p-2 mt-1"
                                    />
                                </div>

                                {/* Rooms */}
                                <div className="mb-3">
                                    <label className="text-sm text-gray-700">Rooms</label>
                                    <input
                                        type="number"
                                        value={filters.rooms}
                                        onChange={(e) => handleChange("rooms", e.target.value)}
                                        className="w-full border rounded-lg p-2 mt-1"
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-end gap-3 mt-5">
                                    <button
                                        onClick={() => setFilterModalOpen(false)}
                                        className="px-4 py-2 border rounded-lg"
                                    >
                                        Close
                                    </button>

                                    <button
                                        onClick={applyFilters}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                                    >
                                        Apply Filters
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="grid justify-items-center p-4">
                        <Link href="/properties/create"
                              className=" inline-flex items-center justify-center
                            px-5 py-2.5
                            rounded-xl
                            font-semibold
                            text-white
                            bg-indigo-600
                            hover:bg-indigo-700
                            active:bg-indigo-800
                            transition-all duration-200
                            shadow-sm hover:shadow
                            focus:outline-none focus:ring-2 focus:ring-indigo-400
                            "
                        >
                            Add a property

                        </Link>
                    </div>

                    <div className="p-4">
                        <h2 className="font-bold text-lg">Current Listed Properties</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {properties.data.map(p => (
                                <PropertyItem key={p.id} {...p} image_paths={p.images} canEdit={true} canDelete={true}
                                  onEdit={() => {
                                      router.get(`/properties/${p.id}/edit`);
                                  }}
                                  onDelete={() => {
                                      if (!confirm("Are you sure you want to delete this property?")) return;

                                      router.post(`/properties/${p.id}/delete`, {
                                          id: p.id,
                                      }, {
                                          preserveScroll: true,
                                      });
                                  }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
    );
};

export default Properties;
