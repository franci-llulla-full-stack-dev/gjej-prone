import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';
import { router } from '@inertiajs/react';

const Properties = ({ properties, pagination, filters }) => {

    const [paginationModel, setPaginationModel] = useState({
        page: pagination.current_page - 1,
        pageSize: pagination.per_page,
    });

    const handleEdit = (row) => {
        router.get(`/admin/properties/${row.id}/edit`);
    };

    const handleDelete = (row) => {
        if (!confirm('Are you sure?')) return;

        router.delete(`/admin/properties/${row.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                router.reload({ only: ['properties', 'pagination'] });
            },
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
