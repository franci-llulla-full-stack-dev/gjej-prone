import { Link, router } from '@inertiajs/react';
import PropertyRequestItem from '../../components/PropertyRequestItem.jsx';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Pagination from '../../components/Pagination.jsx';
import PropertyFilter from '../../components/PropertyFilter.jsx';

const PropertyRequests = ({ propertyRequests }) => {
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
                <h2 className="font-bold text-lg">Kërkesat e listuara</h2>
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
