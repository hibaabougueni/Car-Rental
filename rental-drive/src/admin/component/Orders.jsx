import Header from "./Header";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, FormControl, useTheme, InputLabel, Select, MenuItem, IconButton} from "@mui/material";
import { tokens } from "../theme";
import { DataGrid } from '@mui/x-data-grid';
import OrderService from "../../services/OrderService";
import InfoIcon from '@mui/icons-material/Info';


const Orders=()=>{
    const theme=useTheme();
    const colors=tokens(theme.palette.mode);

    const handleChange=(event,id)=>{
        const newStatus= event.target.value;
        if(newStatus==="CONFIRMED"){
            OrderService.confirmOrder(id);
        } else if(newStatus==="CANCELED"){
            OrderService.cancelOrder(id);
        } else if(newStatus==="DELETED"){
            OrderService.deleteOrder(id)
            .then(()=>{
                setOrders((prevOrders) => prevOrders.filter(order => order.id !== id));
            }).catch(error=>{
                console.error("error deleting order");
            })

        }
    };

    const navigate=useNavigate();

    const handleInfo=(id)=>{
        navigate(`/admin/infoOrder/id/${id}`);
    }
    
    const columns=[
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'orderId', headerName: 'Order Id', width: 170 },
        { field: 'user', headerName: 'User', width: 130 },
        { field: 'orderDate', headerName: 'Date', width: 170 },
        { field: 'totalItems', headerName: 'Number Of Items', width: 90 },
        { field: 'totalPrice', headerName: 'Price', width: 100 },
        { field: 'totalDiscountedPrice', headerName: 'Discounted Price', width: 100 },
        { field: 'discount', headerName: 'Discount', width: 100 },
        { field: 'orderStatus', headerName: 'Status', width: 140, renderCell:(param)=>
                                                                        <Box sx={{ minWidth: 120 }}  >
                                                                            <FormControl fullWidth sx={{ mt:1 , height:"50"}} size="small">
                                                                            <InputLabel id={`status-label-${param.row.id}`}>{param.row.orderStatus}</InputLabel>
                                                                            <Select
                                        
                                                                                labelId={`status-label-${param.row.id}`}
                                                                                id={`status-label-${param.row.id}`}
                                                                                value={param.row.orderStatus}
                                                                                label={param.row.orderStatus}
                                                                                onChange={(event) => handleChange(event, param.row.id)}
                                                                            >
                                                                                <MenuItem value="CONFIRMED">CONFIRMED</MenuItem>
                                                                                <MenuItem value="CANCELED">CANCELED</MenuItem>
                                                                                <MenuItem value="DELETED">DELETED</MenuItem>
                                                                            </Select>
                                                                            </FormControl>
                                                                        </Box>
         },
         {field:'infos', headerName:'Customer', width: 80, renderCell:(param)=> <Box>
                                                                                <IconButton onClick={()=>handleInfo(param.id)}><InfoIcon sx={{color:'orange'}}/></IconButton>
                                                                                </Box>
         }
    ];



    const [orders, setOrders]=useState([]);

    useEffect(()=>{
        OrderService.getAllOrders()
        .then(res=>{
            const orderData=res.data.map((order,index)=>({
                id:order.id,
                orderId:order.orderId,
                user:order.user.email,
                orderDate:order.orderDate,
                totalItems:order.totalItems,
                totalPrice:order.totalPrice,
                totalDiscountedPrice:order.totalDiscountedPrice,
                discount:order.discount,
                orderStatus:order.orderStatus,
            }));
            setOrders(orderData);
        }).catch((error)=>{
            console.error("There was an error while showing the orders", error);
        })
    });




    return(
        <Fragment>
            <Box m="20px">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Header title="Orders" subtitle="View All Orders" />
                </Box>
            </Box>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={orders}
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
export default Orders;