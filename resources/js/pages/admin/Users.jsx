import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';
import { router } from '@inertiajs/react';

const Users = ({ users, pagination, filters }) => {

    const [paginationModel, setPaginationModel] = useState({
        page: pagination.current_page - 1,
        pageSize: pagination.per_page,
    });

    const handleEdit = (row) => {
        router.get(`/admin/users/${row.id}/edit`);
    };

    const handleDelete = (row) => {
        if (!confirm('Are you sure?')) return;

        router.delete(`/admin/users/${row.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                router.reload({ only: ['users', 'pagination'] });
            },
        });
    };

    const handleVerify = (row) => {
        router.post(`/admin/users/${row.id}/verify`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                router.reload({ only: ['users'] });
            },
        });
    };

    const columns = [
        { field: 'name', headerName: 'Name', flex: 1, minWidth: 100 },
        { field: 'surname', headerName: 'Surname', flex: 1, minWidth: 100 },
        { field: 'email', headerName: 'Email', flex: 1, minWidth: 100 },
        { field: 'role', headerName: 'Role', flex: 1, minWidth: 100 },
        { field: 'address', headerName: 'Address', flex: 2, minWidth: 130 },
        { field: 'email_verification', headerName: 'Surface', flex: 1, minWidth: 80 },
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
                        rows={users}
                        columns={columns}
                        getRowId={(row) => row.id}
                        rowCount={pagination.total}
                        paginationMode="server"
                        paginationModel={paginationModel}
                        onPaginationModelChange={(model) => {
                            setPaginationModel(model);

                            router.get(
                                '/admin/users',
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

export default Users;
