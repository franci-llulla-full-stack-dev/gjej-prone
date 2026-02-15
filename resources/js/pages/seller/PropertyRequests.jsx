import { Link, router, usePage } from '@inertiajs/react';
import PropertyRequestItem from '../../components/PropertyRequestItem.jsx';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Pagination from '../../components/Pagination.jsx';
import PropertyFilter from '../../components/PropertyFilter.jsx';
import { Bookmark } from 'lucide-react';

const PropertyRequests = ({ propertyRequests }) => {
    const { auth } = usePage().props;
    const [filters, setFilters] = useState({
        search: '',
        min_price: '',
        max_price: '',
        currency: 'EUR',
        sale_type: '',
        types: [],
        elevator: false,
        mortgage: false,
        rooms_min: '',
        rooms_max: '',
        bathrooms_min: '',
        bathrooms_max: '',
        surface_min: '',
        surface_max: '',
        balconies_min: '',
        balconies_max: '',
        user_id: '',
        parkim: false,
        mobilim: false,
        saved: false,
    });

    const reloadProperties = () => {
        router.get('/property/requests/all', filters, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <div className="grid grid-cols-1">
            <PropertyFilter
                filters={filters}
                setFilters={setFilters}
                onApply={reloadProperties}
            />

            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-lg">Kërkesat e listuara</h2>
                    {auth?.user && (
                        <button
                            onClick={() => {
                                const newSavedValue = !filters.saved;
                                setFilters({ ...filters, saved: newSavedValue });
                                router.get('/property/requests/all', { ...filters, saved: newSavedValue }, {
                                    preserveState: true,
                                    replace: true,
                                });
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                                filters.saved
                                    ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            <Bookmark size={20} fill={filters.saved ? "#000" : "none"} />
                            {filters.saved ? 'Shfaq të gjitha' : 'Vetëm të ruajtura'}
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {propertyRequests?.data?.length > 0 ? (
                        propertyRequests.data.map(p => (
                            <PropertyRequestItem key={p.id} {...p} />
                        ))
                    ) : (
                        <div className="col-span-3 text-center text-gray-500">
                            Nuk ka kërkesa të listuara.
                        </div>
                    )}
                </div>
                <div className="mt-6">
                    <Pagination links={propertyRequests.links} />
                </div>
            </div>
        </div>
    );
};

export default PropertyRequests;
