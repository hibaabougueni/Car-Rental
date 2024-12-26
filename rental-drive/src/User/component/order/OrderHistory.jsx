import  {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import OrderService from '../../../services/OrderService';
import UserService from '../../../services/UserService';

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#103b0e",
      color:"white",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: "#fdf9f3",
    },
    
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const OrderHistory=()=>{
      
    const navigate=useNavigate();
    const [row, setRow]=useState([]);
    const token=localStorage.getItem("token");
    const [user, setUser]=useState({});

    useEffect(() => {
        if (token ) {
            UserService.getUser(token)
                .then(response => {
                    setUser(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.error("Error fetching user or order data", error);
                });
        }
    }, [token]);

    useEffect(()=>{
        OrderService.userHistory(user.id)
        .then((res)=>{
            setRow(res.data);
        })
        .catch((error)=>{
            console.error("error happened while fetching orders", error);
        })
    })

    const handleClick=(id)=>{
        navigate(`/orderDetails/${id}`);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "CANCELED":
                return "red";
            case "PLACED":
                return "orange";
            case "CONFIRMED":
                return "green";
            default:
                return "black";
        }
    };


      return (
        <div className='container'>
        <Typography variant="h4" sx={{marginTop:"50px", fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>Order History</Typography>
        <Typography sx={{color:"#c0bfbf", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>
          Check all your orders.
        </Typography>
        <TableContainer >
          <Table sx={{ minWidth: 700,  marginTop:"40px"}} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Order No</StyledTableCell>
                <StyledTableCell align="center">Order Date</StyledTableCell>
                <StyledTableCell align="center" >Order Amount</StyledTableCell>
                <StyledTableCell align="center">Order Status</StyledTableCell>
                <StyledTableCell align="center">View</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {row.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {row.orderId}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.orderDate}</StyledTableCell>
                  <StyledTableCell align="center" sx={{fontWeight:"700"}}>{row.totalDiscountedPrice}</StyledTableCell>
                  <StyledTableCell align="center" sx={{color:getStatusColor(row.orderStatus)}}>{row.orderStatus}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button variant="contained" 
                         sx={{marginTop:"13px", 
                          backgroundColor:"#103b0e",
                          "&:hover":{
                              backgroundColor:"#51C44A",
                              color:"#103b0e"
                          }
                      }}
                    onClick={()=>handleClick(row.id)}>
                        View Details
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      );

}

export default OrderHistory;