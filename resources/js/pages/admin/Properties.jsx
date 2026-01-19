import React, { useState } from 'react';
import { Button, Grid, useMediaQuery, Tabs, Tab, Box } from '@mui/material';
import { router, Link } from '@inertiajs/react';
import Swal from "sweetalert2";
import PropertyCard from '../../components/PropertyCard';
import PropertyFilterModal from '../../components/PropertyFilterModal';

const Properties = ({ properties, pagination, filters, showDeleted, users = [] }) => {
    const isMobile = useMediaQuery('(max-width:768px)');
    const [viewMode, setViewMode] = useState(isMobile ? 'card' : 'grid');
    const [activeTab, setActiveTab] = useState(showDeleted ? 1 : 0);

    const [paginationModel, setPaginationModel] = useState({
        page: pagination.current_page - 1,
        pageSize: pagination.per_page,
    });

    const [filterState, setFilterState] = useState({
        verified: filters.verified ?? '',
        sale_type: filters.sale_type ?? '',
        search: filters.search ?? '',
        user_id: filters.user_id ?? '',
        virtual_tour: false,
        rivleresim: false,
        combo_package: false,
        virtual_tour_done: false,
        rivleresim_done: false,
        min_price: filters.min_price ?? '',
        max_price: filters.max_price ?? '',
        currency: filters.currency ?? 'EUR',
        types: filters.types ?? [],
        elevator: false,
        mortgage: false,
        parkim: false,
        mobiluar: false,
        rooms_min: filters.rooms_min ?? '',
        rooms_max: filters.rooms_max ?? '',
        bathrooms_min: filters.bathrooms_min ?? '',
        bathrooms_max: filters.bathrooms_max ?? '',
        surface_min: filters.surface_min ?? '',
        surface_max: filters.surface_max ?? '',
        balconies_min: filters.balconies_min ?? '',
        balconies_max: filters.balconies_max ?? '',
    });

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        setPaginationModel((prev) => ({ ...prev, page: 0 }));

        router.get('/admin/properties', {
            ...filterState,
            show_deleted: newValue === 1 ? '1' : '0',
            page: 1,
            per_page: paginationModel.pageSize,
        }, {
            preserveState: false,
            replace: true,
        });
    };

    const handleEdit = (row) => {
        router.get(`/admin/properties/${row.id}/edit`);
    };

    const handleView = (row) => {
        router.get(`/properties/${row.id}`);
    };

    const handleDelete = (row) => {
        Swal.fire({
            title: 'Je i sigurt?',
            text: "Kjo pronë do të fshihet përkohësisht!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Po, fshije!',
            cancelButtonText: 'Anulo'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/admin/properties/${row.id}`, {
                    preserveScroll: true,
                    onSuccess: () => {
                        router.reload({ only: ['properties', 'pagination'] });
                    },
                });
                Swal.fire('U fshi!', 'Prona u fshi me sukses.', 'success');
            }
        });
    };

    const handleRestore = (row) => {
        Swal.fire({
            title: 'Restauro pronën?',
            text: "Prona do të kthehet në listën aktive.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Po, restauroje!',
            cancelButtonText: 'Anulo'
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(`/admin/properties/${row.id}/restore`, {}, {
                    preserveScroll: true,
                });
                Swal.fire('U restaurua!', 'Prona u restaurua me sukses.', 'success');
            }
        });
    };

    const handlePermanentDelete = (row) => {
        Swal.fire({
            title: 'Fshirje përfundimtare?',
            text: "Kjo veprim NUK mund të zhbëhet!",
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Po, fshije përfundimisht!',
            cancelButtonText: 'Anulo'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/admin/properties/${row.id}/force-delete`, {
                    preserveScroll: true,
                    onSuccess: () => {
                        router.reload({ only: ['properties', 'pagination'] });
                    },
                });
                Swal.fire('U fshi përfundimisht!', 'Prona u fshi përgjithmonë.', 'success');
            }
        });
    };

    const handleVerify = (row) => {
        router.post(`/admin/properties/${row.id}/verify`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                router.reload({ only: ['properties'] });
            },
        });
    };

    const applyFilters = () => {
        setPaginationModel((prev) => ({ ...prev, page: 0 }));

        router.get('/admin/properties', {
            ...filterState,
            show_deleted: activeTab === 1 ? '1' : '0',
            page: 1,
            per_page: paginationModel.pageSize,
        }, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <Box sx={{ display: 'grid', gap: 2 }}>
            {/* Tabs */}
            <Box sx={{
                mx: { xs: 0, sm: 10, md: 20 },

                borderBottom: 1,
                borderColor: 'grey.300'
            }}>
                <Tabs value={activeTab} onChange={handleTabChange}>
                    <Tab label="Pronat Aktive" />
                    <Tab label="Pronat e Fshira" />
                </Tabs>
            </Box>

            <Box sx={{ mx: { xs: 2, sm: 10, md: 20 }, mt: 2 }}>
                <PropertyFilterModal
                    filters={filterState}
                    setFilters={setFilterState}
                    onApply={applyFilters}
                    on
                    users={users}
                />
            </Box>
            {/* Përmbajtja */}
            <Box sx={{ p: { xs: 2, sm: 5 }, mx: { xs: 0, sm: 5, md: 10 } }}>
                <Box sx={{ display: 'grid', gap: 3 }}>
                        <Box sx={{ fontWeight: 'medium', fontSize: '1.1rem' }}>
                            Gjithsej: {pagination.total} {pagination.total === 1 ? 'pronë' : 'prona'}
                        </Box>
                    <Box sx={{ fontWeight: 'medium', fontSize: '1.1rem' }}>
                        <Link href='/admin/properties/create' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Shto Pronë të Re
                        </Link>
                    </Box>
                        <Grid container spacing={{sm:2, md:5, lg:7}} justifyContent="center">
                            {properties.map((property) => (
                                <Grid key={property.id}>
                                    <PropertyCard
                                        property={property}
                                        onView={handleView}
                                        onEdit={handleEdit}
                                        onDelete={activeTab === 0 ? handleDelete : null}
                                        onVerify={activeTab === 0 ? handleVerify : null}
                                        onRestore={activeTab === 1 ? handleRestore : null}
                                        onPermanentDelete={activeTab === 1 ? handlePermanentDelete : null}
                                        isDeleted={activeTab === 1}
                                    />
                                </Grid>
                            ))}
                        </Grid>

                        <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 2, alignItems: 'center', justifyContent: 'center', mt: 3 }}>
                            <Button
                                disabled={paginationModel.page === 0}
                                onClick={() => {
                                    const newPage = paginationModel.page - 1;
                                    setPaginationModel((prev) => ({ ...prev, page: newPage }));
                                    router.get('/admin/properties', {
                                        ...filterState,
                                        show_deleted: activeTab === 1 ? '1' : '0',
                                        page: newPage + 1,
                                        per_page: paginationModel.pageSize,
                                    }, { preserveState: true, preserveScroll: true, replace: true });
                                }}
                            >
                                Mëparshme
                            </Button>
                            <Box sx={{ textAlign: 'center' }}>
                                Faqja {paginationModel.page + 1} nga {Math.ceil(pagination.total / paginationModel.pageSize)}
                            </Box>
                            <Button
                                disabled={(paginationModel.page + 1) >= Math.ceil(pagination.total / paginationModel.pageSize)}
                                onClick={() => {
                                    const newPage = paginationModel.page + 1;
                                    setPaginationModel((prev) => ({ ...prev, page: newPage }));
                                    router.get('/admin/properties', {
                                        ...filterState,
                                        show_deleted: activeTab === 1 ? '1' : '0',
                                        page: newPage + 1,
                                        per_page: paginationModel.pageSize,
                                    }, { preserveState: true, preserveScroll: true, replace: true });
                                }}
                            >
                                Tjetra
                            </Button>
                        </Box>
                    </Box>
            </Box>
        </Box>
    );
};

export default Properties;
