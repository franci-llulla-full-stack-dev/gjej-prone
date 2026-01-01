import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';
import { router } from '@inertiajs/react';
import Select from 'react-select';
import Swal from "sweetalert2";

const Properties = ({ properties, pagination, filters }) => {

    const [paginationModel, setPaginationModel] = useState({
        page: pagination.current_page - 1,
        pageSize: pagination.per_page,
    });

    const [filterState, setFilterState] = useState({
        verified: filters.verified ?? '',
        type_of_sale: filters.type_of_sale ?? '',
        city: filters.city ?? '',
    });
    const verifiedOptions = [
        { value: '', label: 'All' },
        { value: '1', label: 'Verified' },
        { value: '0', label: 'Not Verified' },
    ];

    const saleOptions = [
        { value: '', label: 'All' },
        { value: 'sale', label: 'Sale' },
        { value: 'rent', label: 'Rent' },
    ];

    const handleEdit = (row) => {
        router.get(`/admin/properties/${row.id}/edit`);
    };

    const handleDelete = (row) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/admin/properties/${row.id}`, {
                    preserveScroll: true,
                    onSuccess: () => {
                        router.reload({ only: ['properties', 'pagination'] });
                    },
                });
                Swal.fire('Deleted!', 'The property has been deleted.', 'success')
            }
        })


    };

    const handleVerify = (row) => {
        router.post(`/admin/properties/${row.id}/verify`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                router.reload({ only: ['properties'] });
            },
        });
    };
    const applyFilters = (newFilters) => {
        const merged = { ...filterState, ...newFilters };

        setFilterState(merged);
        setPaginationModel((prev) => ({ ...prev, page: 0 }));

        router.get(
            '/admin/properties',
            {
                ...merged,
                page: 1,
                per_page: paginationModel.pageSize,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const columns = [
        { field: 'type_of_sale', headerName: 'Type of Sale', flex: 1, minWidth: 100 },
        { field: 'property_type', headerName: 'Type', flex: 1, minWidth: 100 },
        { field: 'property_category', headerName: 'Category', flex: 1, minWidth: 100 },
        { field: 'city', headerName: 'City', flex: 1, minWidth: 100 },
        { field: 'street', headerName: 'Street', flex: 2, minWidth: 130 },
        { field: 'surface', headerName: 'Surface', flex: 1, minWidth: 80 },
        {
            field: 'price',
            headerName: 'Price',
            flex: 1.5,
            minWidth: 120,
            renderCell: (params) => {
                if (!params.row.price) return '-';
                return `${params.row.price} ${params.row.currency}`;
            },
        },
        { field: 'total_rooms', headerName: 'Rooms', flex: 1, minWidth: 80 },
        { field: 'total_bathrooms', headerName: 'Bathrooms', flex: 1, minWidth: 100 },
        { field: 'total_balconies', headerName: 'Balconies', flex: 1, minWidth: 100 },
        { field: 'floor_number', headerName: 'Floor', flex: 1, minWidth: 70 },
        { field: 'total_floors', headerName: 'Floors', flex: 1, minWidth: 70 },
        { field: 'year_built', headerName: 'Year Built', flex: 1, minWidth: 90 },
        { field: 'sold', headerName: 'Sold', type: 'boolean', flex: 0.8, minWidth: 70 },
        { field: 'verified', headerName: 'Verified', type: 'boolean', flex: 0.8, minWidth: 70 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 2,      // takes remaining space
            minWidth: 240,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <Button size="small" variant="outlined" onClick={() => handleEdit(params.row)}>
                        Edit
                    </Button>
                    <Button size="small" color="error" variant="outlined" onClick={() => handleDelete(params.row)}>
                        Delete
                    </Button>
                    <Button size="small" color="success" variant="outlined" onClick={() => handleVerify(params.row)}>
                        {params.row.verified ? 'Unverify' : 'Verify'}
                    </Button>
                </Stack>
            ),
        },
    ];


    return (
        <div className="grid">
            <div className="mx-20 mt-10 p-5 border border-gray-300">
                <h1 className="py-5">Filters</h1>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Verified</label>
                        <Select
                            value={verifiedOptions.find(o => o.value === filterState.verified)}
                            onChange={(opt) => applyFilters({ verified: opt.value })}
                            options={verifiedOptions}
                            placeholder="Verified"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Type of Sale</label>
                        <Select
                            value={saleOptions.find(o => o.value === filterState.type_of_sale)}
                            onChange={(opt) => applyFilters({ type_of_sale: opt.value })}
                            options={saleOptions}
                            placeholder="Type of Sale"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">City</label>
                        <input
                            type="text"
                            value={filterState.city}
                            onChange={(e) => {
                                const value = e.target.value;
                                setFilterState((prev) => ({ ...prev, city: value }));
                                applyFilters({ city: value });
                            }}
                            placeholder="City"
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                        />
                    </div>
                </div>
                {/* Reset */}
                <div className="py-5">
                    <Button
                        variant="outlined"
                        onClick={() => applyFilters({ verified: '', type_of_sale: '', city: '' })}
                    >
                        Reset
                    </Button>
                </div>


            </div>

            <div className="p-5 justify-self-center" style={{width: '95%'}}>
               <div style={{ height: 'auto'}} className="p-4 max-w-full">
                   <DataGrid
                       rows={properties}
                       columns={columns}
                       getRowId={(row) => row.id}
                       rowCount={pagination.total}
                       paginationMode="server"
                       paginationModel={paginationModel}
                       onPaginationModelChange={(model) => {
                           setPaginationModel(model);

                           router.get(
                               '/admin/properties',
                               {
                                   ...filters,
                                   page: model.page + 1,
                                   per_page: model.pageSize,
                               },
                               {
                                   preserveState: true,
                                   preserveScroll: true,
                                   replace: true,
                               }
                           );
                       }}
                       pageSizeOptions={[10, 25, 50]}
                       disableRowSelectionOnClick
                   />
               </div>
           </div>


        </div>
    );
};

export default Properties;
