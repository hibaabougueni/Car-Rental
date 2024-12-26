import { Box, Grid, Typography, Button,TextField, FormControlLabel, Checkbox, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import OrderService from "../../../services/OrderService";
import { useEffect, useState, } from "react";
import UserService from "../../../services/UserService";
import CartItemService from "../../../services/CartItemService";
import CartService from "../../../services/CartService";

const Checkout=()=>{

    const navigate=useNavigate();
    const token=localStorage.getItem("token");
    const [user, setUser]=useState({});
    const [customer, setCustomer]=useState({
        firstname:"",
        lastname:"",
        phone:"",
        license:""
    });
    const [orderItems, setOrderItems]=useState([]);
    const [cart, setCart]= useState({});
    const [cartItems, setCartItems] = useState([]);


    useEffect(() => {
        if (token ) {
            UserService.getUser(token)
                .then(response => {
                    setUser(response.data);
                    console.log(response.data);
                    return CartService.findCart(response.data.id)
                })
                .then(response => {
                    console.log('Cart data:', response.data);
                    setCart(response.data);
                    setCartItems(response.data.cartItems);
                })
                .catch(error => {
                    console.error("Error fetching user or order data", error);
                });
        }
    }, [token]);

    const handleChange=(event)=>{
        const {name,value}=event.target;
        setCustomer({...customer, [name]:value});

    };

    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState('');

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        setError(''); // Reset error when checkbox is toggled
    };


    const handleSubmit=()=>{
        
        OrderService.addOrder(user.id, customer)
            .then(response => {
                if (!isChecked) {
                    setError('You must accept the terms and conditions.');
                } else {
                    setOrderItems(response.data.orderItems);
                console.log('Order successfully created:', response.data);
                setCustomer({
                    firstname:"",
                    lastname:"",
                    phone:"",
                    license:""
                });
                CartItemService.deleteAll(user.id)
                .then(()=>{
                    navigate('/history');
                }).catch(error=>{
                console.log("something went wrong", error)
                })
                }                
            })
            .catch(error => {
                console.error('Error creating order:', error);
            });
    }

    
  


    return(

        <div className="container">
            <Grid container spacing={6} >
                <Grid item xs={12} sx={{marginTop:"80px"}}>
                    <Typography variant="h4">CHECKOUT</Typography>
                </Grid>
                <Grid item xs={12} md={6} sm={6}>

                {cartItems.map((item,index)=>(
                    <Grid container sx={{backgroundColor:"white", borderRadius:"5px", boxShadow:"2", margin:"10px"}}>
                        <Grid item xs={4} sm={4} md={4}>
                            <img src={item.vehicule.imageURL} alt="img" width="100%" height="120px"/>
                        </Grid>
                        <Grid item xs={8} sm={8} md={8}>
                            <Typography> {item.vehicule.brand}, {item.vehicule.model}, {item.vehicule.year}, {item.vehicule.color} </Typography>
                            <Typography>pickup date : {item.pickupDate}</Typography>
                            <Typography>Return date : {item.returnDate}</Typography>
                            <Typography>Duration : {(item.itemPrice / item.vehicule.price).toFixed(0)} Days</Typography>
                            <Typography>Baby's seat: {item.babySeat}</Typography>
                            <div style={{display:"flex"}}>
                                <Typography sx={{marginRight:"5px", fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>{item.vehicule.discountedPrice} DH/Day</Typography>
                                <Typography sx={{marginRight:"5px", color:"#c0bfbf" ,fontWeight:"600",textDecorationLine:"line-through", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>{item.vehicule.price} DH</Typography>
                                <Typography sx={{color:"#01b759", fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>{item.vehicule.discountPercent}% off</Typography>
                            </div>
                        </Grid>
                    </Grid>
                ))}

                <Grid container sx={{padding:"15px",backgroundColor:"white", borderRadius:"5px", boxShadow:"2", margin:"40px 10px"}}>
                    <Grid item xs={12}>
                        <Typography sx={{padding:"0px 15px 15px 15px", fontWeight:"650", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>PRICE DETAILS</Typography>
                        <hr color="#f0eded"></hr>
                        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 15px"}}>
                            <Typography sx={{fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>Price ({cart.totalItems} vehicles)</Typography>
                            <Typography sx={{fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>{cart.totalPrice}DH</Typography>
                        </div>
                        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 15px"}}>
                            <Typography sx={{fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>Discount</Typography>
                            <Typography sx={{fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px", color:"#01b759"}}>-{cart.discount}DH</Typography>
                        </div>
                        <hr color="#f0eded"></hr>
                        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"15px"}}>
                            <Typography sx={{fontSize:"20px",fontWeight:"700", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>Total Amount</Typography>
                            <Typography sx={{fontSize:"20px",fontWeight:"700", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>{cart.totalDiscountedPrice}DH</Typography>
                        </div>
                    </Grid>
                </Grid>

                </Grid>

                <Grid item xs={12} sm={6} md={6} sx={{marginTop:"-90px"}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h4" sx={{textAlign:"center", marginBottom:"45px"}}>Bill Details</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField 
                            required 
                            fullWidth
                            value={customer.firstname}
                            onChange={handleChange}
                            label="First Name"
                            name="firstname"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField 
                            required 
                            fullWidth
                            value={customer.lastname}
                            onChange={handleChange}
                            label="Last Name"
                            name="lastname"
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField  
                            fullWidth
                            value={customer.license}
                            onChange={handleChange}
                            label="Driver's License"
                            name="license"
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField 
                            required 
                            fullWidth
                            value={customer.phone}
                            onChange={handleChange}
                            label="Phone Number"
                            name="phone"
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{border:"2px solid green", margin:"70px 0px 5px 20px", padding:"10px"}}>
                                <Typography variant="h6" sx={{fontFamily: "'Montserrat', arial"}}>Cash on Delivery</Typography>
                                <Typography variant="subtitle1" sx={{color:"#a6a6a6", fontStyle:"italic", fontFamily: "'Montserrat', arial"}}>Pay with cash upon delivery.</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{margin:"10px"}}>
                                <Typography sx={{fontFamily: "'Montserrat', arial"}}>Your personal data will be used to process your order, 
                                    assist you during your visit to the website, 
                                    and for other reasons described in our privacy policy.
                                </Typography>
                                <FormControlLabel
                                    control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
                                    label={
                                        <Typography sx={{ fontFamily: "'Montserrat', arial" }}>
                                            I have read and accept the {' '}
                                            <Link to="/conditions" target="_blank">
                                                terms and conditions
                                            </Link>
                                        </Typography>
                                    }
                                />
                                {error && <Alert severity="error">{error}</Alert>}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button 
                            onClick={handleSubmit}
                            variant="contained" fullWidth
                            sx={{marginTop:"10px", marginBottom:"10px",
                                padding:"6px 25px",
                                fontFamily: "'Montserrat', arial", letterSpacing: "1px",
                                backgroundColor:"#54B435",
                                "&:hover":{
                                    backgroundColor:"#01b759",
                                    color:"#1d392b"
                                }
                            }}
                            >
                                VALIDATE
                            </Button>
                        </Grid>
                    </Grid>    
                </Grid>
                            
            </Grid>
        </div>
    )
}

export default Checkout;