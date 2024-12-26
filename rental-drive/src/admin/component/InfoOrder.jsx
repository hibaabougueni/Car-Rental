import {React,useState, useEffect} from "react";
import { Button,Box, useTheme, Card, CardContent,Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Avatar } from "@mui/material";
import Header from "./Header";
import { tokens } from "../theme";
import { useNavigate, useParams } from "react-router-dom";
import OrderService from "../../services/OrderService";

const InfoOrder=()=>{


    const theme=useTheme();
    const colors=tokens(theme.palette.mode);

    const navigate=useNavigate();
    const handleClick=()=>{
        navigate("/admin/order");
    };

    const { id } = useParams();

    const [order,setOrder]= useState({
        customer:{
            firstname:"",
            lastname:"",
            licence:"",
            phone:""
        },
        orderItems:[{
            id:"",
            vehicule:{},
            pickupDate:"",
            returnDate:"",
            returnPlace:"",
            pickupPlace:""
        }]

    });
    useEffect(()=>{
        OrderService.findOrderById(id)
            .then((res)=>{
                setOrder(res.data);
            })
            .catch(err=>{
                console.error("no such order found", err);
            })
    });

    return(
        <Box>
            <Box m="20px">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Header title="Vehicule's Informations" subtitle="View All Informations" />
                    <Button variant="contained" 
                            onClick={handleClick}
                            sx={{
                                backgroundColor:`${colors.thirdDegree}`,
                                color:`${colors.text}`,
                                "&:hover":{
                                    backgroundColor:`${colors.text}`,
                                    color:`${colors.fourthDegree}`,
                                },
                            }}
                    >
                        BACK
                    </Button>
                </Box>

                <Card sx={{ width:"500px",backgroundColor:`${colors.thirdDegree}` }}>
                    <CardContent>
                        
                        <Typography variant="h5" component="div">
                            {order.orderId}
                        </Typography>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                            Customer's Information
                        </Typography>
                        <Typography >
                            Customer's name: {order.customer.firstname} {order.customer.lastname}
                        </Typography>
                        <Typography >
                            Customer's licence: {order.customer.licence} 
                        </Typography>
                        <Typography >
                            Customer's phone: {order.customer.phone} 
                        </Typography>
                        
                    </CardContent>
                </Card>

                <Card sx={{ width:"100%", marginTop:"30px",backgroundColor:`${colors.thirdDegree}` }}>
                    <CardContent>
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                            Order's Information
                        </Typography>
                        <TableContainer component={Paper}> 
                            <Table sx={{ minWidth: 650, backgroundColor:`${colors.thirdDegree}` }} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell align="right">Image</TableCell>
                                    <TableCell align="right">discounted price</TableCell>
                                    <TableCell align="right">Pickup date</TableCell>
                                    <TableCell align="right">return date</TableCell>
                                    <TableCell align="right">pickup place</TableCell>
                                    <TableCell align="right">return place</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {order.orderItems.map((item) => (
                                    <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="row">
                                        {item.vehicule.id}
                                    </TableCell>
                                    <TableCell align="right"> <Avatar src={item.vehicule.imageURL} sx={{ width: 50, height: 50 }}/></TableCell>
                                    <TableCell align="right">{item.vehicule.discountedPrice}</TableCell>
                                    <TableCell align="right">{item.pickupDate}</TableCell>
                                    <TableCell align="right">{item.returnDate}</TableCell>
                                    <TableCell align="right">{item.pickupPlace}</TableCell>
                                    <TableCell align="right">{item.returnPlace}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        
                    </CardContent>
                </Card>
            </Box>
                
        </Box>
    )
}

export default InfoOrder;