import { Button, Grid, Typography, Avatar, TextField } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrderService from "../../../services/OrderService";
import UserService from "../../../services/UserService";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import ReviewService from "../../../services/ReviewService";


const OrderDetails=()=>{

    const navigate=useNavigate();
    const token=localStorage.getItem("token");
    const [user, setUser]=useState({});
    const [order, setOrder]=useState({});
    const [items, setItems]= useState([]);
    const [customer, setCustomer]=useState({});
    const [rating, setRating]= useState(0.5);
    const [reviewText, setReviewText]= useState('');
    const [vehiculeId, setVehiculeId] = useState(null);
    const { id } = useParams();

    const [open, setOpen] = useState(false);

    const handleClickOpen = (vehiculeId) => {
        setVehiculeId(vehiculeId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit=()=>{
        if (user.id) {
        const reviewData={
            vehiculeId: vehiculeId,
            review:reviewText,
            rating:rating
        };
        ReviewService.addReview(user.id, reviewData)
        .then((res)=>{
            console.log("Review submitted successfully", res.data);
            handleClose();
        })
        .catch((error) => {
            console.error("Error submitting review", error);
        });
    }}

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

    const fetchOrderDetails = () => {
        OrderService.findOrderById(id)
            .then((res) => {
                setOrder(res.data);
                setItems(res.data.orderItems);
                setCustomer(res.data.customer);
            })
            .catch((error) => {
                console.error("Error fetching order data", error);
            });
    };

    useEffect(()=>{
        if (user.id) {
            fetchOrderDetails();
        }
        else{
            console.error("error");
        }
                
    }, [user.id]);

    const getStatusColor = (status) => {
        switch (status) {
            case "PLACED":
                return "orange";
            case "CONFIRMED":
                return "green";
            default:
                return "black";
        }
    };

    const handleCancel=(id)=>{
        OrderService.cancelOrder(id)
        .then(()=>{
            console.log("order canceled");
            fetchOrderDetails();
        })
        .catch((error)=>{
            console.error("error", error);
        })
    };



    return(
        <div className="container">
            <Grid container spacing={2} sx={{marginTop:"50px"}}>
                <Grid item xs={12}>
                    <Typography variant="h4" sx={{fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>
                        Order History
                    </Typography>
                    <Typography sx={{color:"#c0bfbf", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>
                        Check the status of your order, manage cancelation, and add a review.
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{backgroundColor:"#fdf9f3", borderRadius:"5px", boxShadow:"2", margin:"20px", padding:"20px"}}>
                    <Typography variant="h5" sx={{fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>Rental Information</Typography>
                    <div style={{display:"flex", margin:"10px"}}>
                        <Typography sx={{fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>First Name: </Typography>
                        <Typography sx={{ marginLeft:"10px",fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>{customer.firstname}</Typography>
                    </div>
                    <div style={{display:"flex", margin:"10px"}}>
                        <Typography sx={{fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>Last Name: </Typography>
                        <Typography sx={{ marginLeft:"10px",fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>{customer.lastname}</Typography>
                    </div>
                    <div style={{display:"flex", margin:"10px"}}>
                        <Typography sx={{fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>Phone Number: </Typography>
                        <Typography sx={{ marginLeft:"10px",fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>{customer.phone}</Typography>
                    </div>
                    <div style={{display:"flex", margin:"10px"}}>
                        <Typography sx={{fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>Driver's License: </Typography>
                        <Typography sx={{ marginLeft:"10px",fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>{customer.license}</Typography>
                    </div>
                </Grid>

                <Grid item xs={12} sx={{border:"2px solid #f0eded", borderRadius:"5px", marginTop:"50px"}}>
                    
                        <Grid item xs={12} sx={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"15px"}}>
                               <div>
                                    <Typography sx={{fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>Order No</Typography>
                                    <Typography>{order.orderId}</Typography>
                               </div>
                                    
                                <div>
                                    <Typography sx={{fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>Date Placed</Typography>
                                    <Typography>{order.orderDate}</Typography>
                                </div>
                                    
                                <div>
                                    <Typography sx={{fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>Total Amount</Typography>
                                    <Typography sx={{fontWeight:"700", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>{order.totalDiscountedPrice}</Typography>
                                </div>
                                {order.orderStatus === "PLACED" ? (
                                    <div style={{marginRight:"10px"}}>
                                        <Button 
                                        variant="outlined" 
                                        onClick={()=>handleCancel(order.id)}> Cancel </Button>
                                    </div>
                                ): (<></>)}    
                                
                                
                        </Grid>
                        {items.map((item)=>(
                            <div>
                             <hr style={{width:"102%", marginLeft:"-18px"}} color="#f0eded"></hr>
                             <Grid container spacing={2} sx={{marginTop:"10px"}}>
                                 <Grid item xs={12} sm={3} md={3}>
                                     <img src={item.vehicule.imageURL} alt="image" width="100%" />
                                 </Grid>
                                 <Grid item xs={12} sm={9} md={9} sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                                     <div style={{paddingLeft:"45px"}}>
                                         <Typography sx={{fontSize:"20px",fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>{item.vehicule.brand} {item.vehicule.model} {item.vehicule.year}</Typography>
                                         <div style={{display:"flex"}}>
                                            <Typography sx={{fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>color : </Typography>
                                            <Typography sx={{fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>{item.vehicule.color}</Typography>
                                         </div>
                                         <div style={{display:"flex"}}>
                                            <Typography sx={{fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>pickup date : </Typography>
                                            <Typography sx={{fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>{item.pickupDate}</Typography>
                                         </div>
                                         <div style={{display:"flex"}}>
                                            <Typography sx={{fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>Return date : </Typography>
                                            <Typography sx={{fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>{item.returnDate}</Typography>
                                         </div>
                                         <div style={{display:"flex"}}>
                                            <Typography sx={{fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>Baby's seat : </Typography>
                                            <Typography sx={{fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>{item.babySeat}</Typography>
                                         </div>
                                     </div>
                                     <div style={{marginTop:"-55px", marginRight:"10px"}}>
                                        <Typography sx={{marginRight:"5px", fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>Amount: {item.vehicule.discountedPrice} DH/Day</Typography>
                                         <Typography sx={{marginRight:"5px", color:"#c0bfbf" ,textDecorationLine:"line-through", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>Price: {item.vehicule.price} DH</Typography>
                                         <Typography sx={{color:"#01b759", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>Discount: {item.vehicule.discountPercent}% off</Typography>
                                     </div>    
                                 </Grid>
                             </Grid>
     
                            
                                 <Grid item xs={12} sx={{display:"flex", justifyContent:"space-between", alignItems:"center", margin:"10px"}}>
                                     <div style={{display:"flex"}}>
                                        {order.orderStatus==="CANCELED" ? (<CancelIcon sx={{color:"red"}} />) :
                                         (<CheckCircleIcon sx={{ color: getStatusColor(order.orderStatus)}}/>)}
                                         <Typography style={{marginLeft:"10px", fontWeight:"600",fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>{order.orderStatus}</Typography>
                                     </div>
                                     <div style={{display:"flex"}}>
                                        <Button onClick={()=>navigate(`/details/${item.vehicule.id}`)}>View Vehicle</Button>
                                        
                                        {order.orderStatus==="CONFIRMED"? (
                                            <Button onClick={()=>handleClickOpen(item.vehicule.id)}>Add review</Button>                                       
                                        ): <></>}
                                    </div>
                                 </Grid>

                                 <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title" sx={{textAlign:"center",color:"black",fontWeight:"600",fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>
                                        Give us your honest review
                                    <hr color="#f0eded" style={{width:"116%", marginLeft:"-24px", marginTop:"15px"}}></hr>
                                    </DialogTitle>
                                    <DialogContent>
                                    <DialogContentText id="alert-dialog-description" >
                                        <Avatar sx={{margin:"10px auto", width:"50px", height:"50px"}}/>
                                        <Typography sx={{textAlign:"center",color:"black",fontWeight:"600",fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>{order.user.firstName} {order.user.lastName}</Typography>
                                        <Typography sx={{margin:"5px",textAlign:"center", fontWeight:"500",fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>{order.user.email}</Typography>
                                        <div style={{margin:"10px 70px"}}>
                                            <Rating name="half-rating" precision={0.5} size="large" 
                                            onChange={(e, newVal)=>{ setRating(newVal);}}
                                            />
                                        </div>
                                        <div >    
                                            <TextField
                                                id="filled-multiline-static"
                                                label="Review"
                                                multiline
                                                rows={4}
                                                variant="filled"
                                                sx={{width:"100%"}}
                                                onChange={(e)=>setReviewText(e.target.value)}
                                            />
                                        </div>
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={handleSubmit} autoFocus>
                                        Submit
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>

                            
                        ))}
                       
                </Grid>
                
            </Grid>
        </div>
    );
}

export default OrderDetails;