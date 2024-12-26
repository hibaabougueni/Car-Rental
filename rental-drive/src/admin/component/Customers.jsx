import { Box } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { Fragment, useState, useEffect } from "react";
import CustomerService from "../../services/CustomerService";
import Header from "./Header";

const Customers=()=>{

    const columns=[
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'email', headerName: 'Email', width: 300 },
        { field: 'firstName', headerName: 'First Name', width: 230 },
        { field: 'lastName', headerName: 'Last Name', width: 230 },
        { field: 'phone', headerName: 'Phone', width: 230 },

    ]

    const [customers, setCustomers]=useState([]);
    useEffect(()=>{
        CustomerService.getAll()
        .then(res=>{
            const customerData=res.data.map((user,index)=>({
                id:user.id,
                email:user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
            }));
            setCustomers(customerData);
        })
    })

    return(
        <Fragment>
            <Box m="20px">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Header title="Customers" subtitle="View All Customers" />
                </Box>
            </Box>
            <div style={{ height: 500, width: '90%', margin:'0 auto 0 auto' }}>
                <DataGrid
                    rows={customers}
                    columns={columns}
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            height: 60, 
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            lineHeight: '1.2', 
                            whiteSpace: 'normal', 
                            overflow: 'visible', 
                            textOverflow: 'ellipsis', 
                        },
                    }}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                    }}
                    pageSizeOptions={[5, 7]}
                    
                />
            </div>
        </Fragment>
    )

}
export default Customers;