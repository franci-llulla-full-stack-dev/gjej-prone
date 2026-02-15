import { useState } from 'react';
import PropertyItem from '../../components/PropertyItem.jsx';
import { Link, router, Head, usePage } from '@inertiajs/react';
import PropertyFilter from '../../components/PropertyFilter.jsx';
import Pagination  from '../../components/Pagination.jsx';
import { Bookmark } from 'lucide-react';

const AllProperties = ({ properties }) => {
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
        mobilim: false,
        parking: false,
        rooms_min: '',
        rooms_max: '',
        bathrooms_min: '',
        bathrooms_max: '',
        surface_min: '',
        surface_max: '',
        balconies_min: '',
        balconies_max: '',
        saved: false,
    });

    const reload = () => {
        router.get('/listed-properties', filters, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <div>
            <Head>
                <title>Pronat e Listuara | Gjej-Prone</title>
                <meta name="description" content="Shiko të gjitha pronat e listuara për shitje ose qira në platformën tonë." />
            </Head>
            <div className="grid grid-cols-1">
                <PropertyFilter
                    filters={filters}
                    setFilters={setFilters}
                    onApply={reload}
                />

                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-bold text-lg">Pronat e listuara</h2>
                        {auth?.user && (
                            <button
                                onClick={() => {
                                    const newSavedValue = !filters.saved;
                                    setFilters({ ...filters, saved: newSavedValue });
                                    router.get('/listed-properties', { ...filters, saved: newSavedValue }, {
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
                        {properties?.data?.length > 0 ? (
                            properties.data.map(p => (
                                <PropertyItem key={p.id} {...p} image_paths={p.images} />
                            ))
                        ) : (
                            <div className="col-span-3 text-center text-gray-500">
                                Nuk ka prona të listuara.
                            </div>
                        )}
                    </div>
                    <div className="mt-6">
                        <Pagination links={properties.links} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProperties;
