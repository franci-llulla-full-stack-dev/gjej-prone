import { Link, router } from '@inertiajs/react';
import PropertyRequestItem from '../../components/PropertyRequestItem.jsx';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Pagination from '../../components/Pagination.jsx';
import PropertyFilter from '../../components/PropertyFilter.jsx';

const PropertyRequests = ({ propertyRequests, users }) => {
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
        router.get('/property/requests', filters, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <div className="grid grid-cols-1">
            <div className="bg-white shadow px-4 pb-4 rounded-xl mb-4">
                <h4 className="pb-4 text-2xl font-bold">Kërkesat e Pronave</h4>
                <PropertyFilter
                    filters={filters}
                    setFilters={setFilters}
                    onApply={reloadProperties}
                    users={users}
                />
                <div className="grid justify-items-center p-4">
                <Link
                    href="/property/request/create"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                    Shto një kërkesë të re
                </Link>
            </div>
                <div className="p-4">
                <h2 className="font-bold text-lg">Kërkesat e listuara</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {propertyRequests.data.map(p => (
                        <PropertyRequestItem
                            key={p.id}
                            {...p}
                            canEdit={true}
                            canDelete={true}
                            onUpload = {() => {
                                router.put(`/property/request/${p.id}/re-upload`);
                            }}
                            onEdit={() => {
                                router.get(`/property/request/${p.id}/edit`);
                            }}
                            onDelete={() => {
                                Swal.fire({
                                    title: 'A jeni i sigurt?',
                                    text: 'Kjo kërkesë do të fshihet përgjithmonë.',
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#dc2626',
                                    cancelButtonColor: '#6b7280',
                                    confirmButtonText: 'Po, fshije',
                                    cancelButtonText: 'Anullo',
                                    reverseButtons: true,
                                }).then((result) => {
                                    if (!result.isConfirmed) return;
                                    router.delete(`/property/request/${p.id}`, {
                                        id: p.id,
                                    }, {
                                        onSuccess: () => {
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Kërkesa u fshi',
                                                timer: 1200,
                                                showConfirmButton: false,
                                            });
                                        },
                                        onError: () => {
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Gabim',
                                                text: 'Ndodhi një problem gjatë fshirjes.',
                                            });
                                        },
                                    });
                                });
                            }}
                        />
                    ))}
                </div>
                <div className="mt-6">
                    <Pagination links={propertyRequests.links} />
                </div>
            </div>
            </div>
        </div>
    );
};

export default PropertyRequests;
