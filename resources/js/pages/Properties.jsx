// javascript
import PropertyItem from '../components/PropertyItem.jsx';
import PropertyFilter from '../components/PropertyFilter.jsx';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Pagination from '../components/Pagination.jsx';

const Properties = ({ properties }) => {
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
    });

    const reload = () => {
        router.get('/properties', filters, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <div className="grid grid-cols-1">
            <PropertyFilter
                filters={filters}
                setFilters={setFilters}
                onApply={reload}
            />

            {/* Shto pronë */}
            <div className="grid justify-items-center p-4">
                <Link
                    href="/properties/create"
                    className="px-5 py-2.5 rounded-xl font-semibold text-white bg-indigo-600"
                >
                    Shto një pronë
                </Link>
            </div>

            {/* Pronat */}
            <div className="p-4">
                <h2 className="font-bold text-lg">Pronat e listuara aktualisht</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.data.map(p => (
                        <PropertyItem
                            key={p.id}
                            {...p}
                            image_paths={p.images}
                            canEdit
                            canDelete
                            onEdit={() => router.get(`/properties/${p.id}/edit`)}
                            onDelete={() => {
                                Swal.fire({
                                    title: 'A jeni i sigurt?',
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#dc2626',
                                }).then(r => {
                                    if (!r.isConfirmed) return;
                                    router.post(`/properties/${p.id}/delete`);
                                });
                            }}
                            onToggleSold={() => {
                                router.put(`/properties/${p.id}/toggle-sold`);
                            }}
                        />
                    ))}
                </div>
                <div className="mt-6">
                    <Pagination links={properties.links} />
                </div>
            </div>
        </div>
    );
};

export default Properties;
