import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import GppGoodIcon from '@mui/icons-material/GppGood';
import LanguageIcon from '@mui/icons-material/Language';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CarRentalIcon from '@mui/icons-material/CarRental';
import VehiculeService from '../../services/VehiculeService';
import OrderService from '../../services/OrderService';
import { useEffect, useState } from 'react';


import './aboutus.css';

const Aboutus1 = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/vehicules');
    };

    const [numVeh, setNumVeh] = useState(0);
    const [numOrder, setNumOrder] = useState(0);
    const [numCust, setNumCust]= useState(0);
    const [order, setOrder] = useState([]);

    const [animatedVeh, setAnimatedVeh] = useState(0);    
    const [animatedCust, setAnimatedCust] = useState(0);  // Animated value for customers
    const [animatedOrder, setAnimatedOrder] = useState(0); 

    useEffect(()=>{
        VehiculeService.findAllVehicules()
        .then((res)=>{
            setNumVeh(res.data.length);
        })
        .catch(error=>{
            console.log("error", error);
        })
    });
    useEffect(()=>{
        OrderService.getAllOrders()
        .then((res)=>{
            const orders=res.data;

            setOrder(orders);
            // Calculate total number of items   array.reduce((accumulator, currentElement) => newAccumulator, initialValue);
            const totalItems = orders.reduce((acc, order) => acc + order.totalItems, 0);
            setNumOrder(totalItems);

            setNumCust(orders.length);

        })
        .catch(error=>{
            console.log("error", error);
        })
    });

    useEffect(() => {
        let incrementVeh, incrementCust, incrementOrder;

        // Function to animate numbers
        const incrementNumber = (setAnimatedValue, finalValue, duration) => {
            const incrementStep = finalValue / (duration / 10); // Calculate step for smooth animation

            return setInterval(() => {
                setAnimatedValue((prev) => {
                    if (prev + incrementStep >= finalValue) {
                        clearInterval(incrementVeh); // Stop when the number reaches final value
                        return finalValue; // Return final value to stop further increments
                    }
                    return prev + incrementStep; // Increment value by step
                });
            }, 10); // Update every 10ms for smooth effect
        };

        // Start animation for each number
        incrementVeh = incrementNumber(setAnimatedVeh, numVeh, 2000); // 2 seconds duration for vehicules
        incrementCust = incrementNumber(setAnimatedCust, numCust, 2000); // 2 seconds for customers
        incrementOrder = incrementNumber(setAnimatedOrder, numOrder, 2000); // 2 seconds for orders

        // Cleanup interval on component unmount
        return () => {
            clearInterval(incrementVeh);
            clearInterval(incrementCust);
            clearInterval(incrementOrder);
        };
    }, [numVeh, numCust, numOrder]);

    return (
        <div >
            <Grid container spacing={4} sx={{ paddingTop: '40px' }}>
                <Grid container spacing={2} sx={{padding:"0 10% 10% 10%" }}>
                   <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '68px'}}>
                    <Typography variant="h3" sx={{color:"#103b0e", fontFamily: "'Montserrat', arial", fontWeight: "bold", letterSpacing: "1px" }}>
                        WHO ARE WE
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src="src/assets/newlogo3.png" alt="Our Logo" width="70%" height="auto" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body1" sx={{ fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>
                    Welcome to RentDrive, your premier destination for vehicle rentals. Whether you're in need of a reliable car for a business trip, 
                    an SUV for a family vacation, a truck for moving, or a luxury car for a special occasion, 
                    we have a wide range of vehicles to suit all your needs. Our commitment to providing exceptional service and high-quality 
                    vehicles ensures that your rental experience is smooth and enjoyable.
                    </Typography>
                    <div style={{borderLeft:"4px solid #005c2b", padding:"0px 10px 10px 10px", backgroundColor:"#f3ede3", marginTop:"50px"}}>
                        <Typography variant="h5" sx={{color:"#103b0e", fontFamily: "'Montserrat', arial", fontWeight: 500, marginTop:"20px", letterSpacing: "1px" }}>
                        Our Mission
                        </Typography>
                        <Typography variant="body1" sx={{ fontFamily: "'Montserrat', arial", marginTop:"10px", letterSpacing: "1px" }}>
                        At RentDrive, our mission is to make vehicle rentals simple, accessible, and affordable for everyone. 
                        We strive to provide our customers with a seamless rental experience, from easy online booking to hassle-free returns. 
                        Our vision is to be the go-to choice for vehicle rentals, known for our extensive fleet, competitive prices, and outstanding customer service. 
                        We are dedicated to continuously improving our services and expanding our offerings to meet the evolving needs of our customers.
                        </Typography>
                    </div>
                    
                </Grid> 
                </Grid>
                
                <Grid container spacing={2} sx={{backgroundColor:"#51c44a", padding:"3% 10% 10% 10%", color:"white"}}>
                    <Grid item xs={12} sm={12}>
                    <Typography variant="h4" sx={{color:"#f3ede3",textAlign:"center", fontFamily:"'Montserrat', arial", letterSpacing: "1px", marginBottom:"20px", fontWeight:"bold", fontSize:"45px"}}>
                        WHY CHOOSE US 
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <AttachMoneyIcon sx={{backgroundColor:"#f3ede3", color:"#51c44a", borderRadius:"50%", width:"55px", height:"55px", padding:"4px"}}/>
                    <Typography variant="subtitle1" sx={{fontWeight:"bold", fontFamily:"'Montserrat', arial", letterSpacing: "1px"}}>
                        Affordable Prices
                    </Typography>
                    <Typography variant="subtitle2" sx={{color:"white", fontFamily:"'Montserrat', arial", letterSpacing: "1px", marginTop:"7px"}}>
                        We believe that quality vehicle rentals should be affordable for everyone
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <AllInclusiveIcon sx={{backgroundColor:"#f3ede3", color:"#51c44a", borderRadius:"50%", width:"55px", height:"55px", padding:"4px"}}/>
                    <Typography variant="subtitle1" sx={{fontWeight:"bold", fontFamily:"'Montserrat', arial", letterSpacing: "1px"}}>
                        Extensive Fleet Selection
                    </Typography>
                    <Typography variant="subtitle2" sx={{color:"white", fontFamily:"'Montserrat', arial", letterSpacing: "1px", marginTop:"7px"}}>
                        We offer an extensive range of vehicles to suit every need and preference. 
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <GppGoodIcon sx={{backgroundColor:"#f3ede3", color:"#51c44a", borderRadius:"50%", width:"55px", height:"55px", padding:"4px"}}/>
                    <Typography variant="subtitle1" sx={{fontWeight:"bold", fontFamily:"'Montserrat', arial", letterSpacing: "1px"}}>
                        Quality and Safety
                    </Typography>
                    <Typography variant="subtitle2" sx={{color:"white", fontFamily:"'Montserrat', arial", letterSpacing: "1px", marginTop:"7px"}}>
                        All our vehicles undergo rigorous inspections and regular maintenance to ensure they meet the highest safety standards.
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <LanguageIcon sx={{backgroundColor:"#f3ede3", color:"#51c44a", borderRadius:"50%", width:"55px", height:"55px", padding:"4px"}}/>
                    <Typography variant="subtitle1" sx={{fontWeight:"bold", fontFamily:"'Montserrat', arial", letterSpacing: "1px"}}>
                        Convenient Booking
                    </Typography>
                    <Typography variant="subtitle2" sx={{color:"white", fontFamily:"'Montserrat', arial", letterSpacing: "1px", marginTop:"7px"}}>
                        Our user-friendly online booking system allows you to reserve a vehicle in just a few clicks. 
                    </Typography>
                </Grid>
                </Grid>

                <Grid container spacing={2} sx={{padding:"7% 10% 8% 10%"}}>
                    <Grid item xs={12} sm={6} >
                        
                            <Typography variant="h4" sx={{fontFamily:"'Montserrat', arial", fontWeight:"bold", fontSize:"45px", letterSpacing: "1px",color:"#103b0e"}}>
                                Plus 2 years of experience
                            </Typography>
                            <Typography variant="subtitle2" sx={{fontFamily:"'Montserrat', arial", letterSpacing: "1px", margin:"15px 0 15px 0",color:"#103b0e"}}>
                            Our team of friendly and knowledgeable staff is always ready to assist you, ensuring that you have a pleasant rental experience from start to finish. We value your feedback and are constantly working to enhance our services based on your suggestions.
                            </Typography>
                           
                        </Grid>
                        
                    <Grid container spacing={2} xs={12} sm={6} sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    
                        <div style={{display:"flex", marginLeft:"20px"}}>
                            <DirectionsCarIcon sx={{width:"70px", height:"70px",color:"#103b0e"}} />
                            <div style={{marginLeft:"7px"}} >
                                <Typography variant="h5" sx={{fontWeight:"bold", fontFamily:"'Montserrat', arial", fontSize:"40px", letterSpacing: "1px", color:"#1d392b"}}>  {Math.floor(animatedVeh)} </Typography>
                                <Typography variant="subtitle1" sx={{fontFamily:"'Montserrat', arial", color:"#103b0e"}}> Vehicle </Typography>
                            </div>
                        </div>
                        <div style={{display:"flex"}}>
                            <PersonOutlineOutlinedIcon sx={{width:"70px", height:"70px",color:"#103b0e"}} />
                            <div style={{marginLeft:"7px"}}>
                                <Typography variant="h5" sx={{fontWeight:"bold", fontFamily:"'Montserrat', arial", fontSize:"40px", color:"#103b0e"}}> {Math.floor(animatedCust)} </Typography>
                                <Typography variant="subtitle1" sx={{fontFamily:"'Montserrat', arial", letterSpacing: "1px", color:"#103b0e"}}> Customer </Typography>
                            </div>
                        </div>
                        <div style={{display:"flex"}}>
                            <CarRentalIcon sx={{width:"70px", height:"70px",color:"#103b0e", marginLeft:"10px"}} />
                            <div style={{marginLeft:"7px"}}>
                                <Typography variant="h5" sx={{fontWeight:"bold", fontFamily:"'Montserrat', arial", fontSize:"40px", color:"#103b0e"}}> {Math.floor(animatedOrder)} </Typography>
                                <Typography variant="subtitle1" sx={{fontFamily:"'Montserrat', arial", letterSpacing: "1px", color:"#103b0e"}}> Rented Vehicle </Typography>
                            </div>
                        </div>
                       
                    </Grid>
                </Grid>

                <Grid container sx={{ 
                    color: 'white', padding:"7% 10% 10% 10%", 
                    textAlign: 'center', 
                    backgroundImage: 'url("src/assets/pic2.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height:"500px"
                    }}>
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom sx={{color:"#f3ede3", fontFamily: "'Montserrat', arial", letterSpacing: "1px", marginBottom:"20px", fontWeight:"bold", fontSize:"45px" }}>
                            Discover Our Vehicles
                        </Typography>
                        <Typography variant="body1" gutterBottom sx={{color:"#f3ede3", fontFamily: "'Montserrat', arial", letterSpacing: "1px", padding:"0 40px 0 40px" }}>
                        Ready to hit the road in style? Discover our wide range of vehicles designed to meet all your needs, 
                        from practical cars and spacious SUVs to robust trucks and luxurious rides. Click below to explore our fleet and find the perfect vehicle for your next adventure!
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            onClick={handleClick}
                            sx={{ marginTop: '20px', 
                                fontFamily: "'Montserrat', arial", letterSpacing: "1px",
                                padding:"10px 25px 10px 25px",
                                marginTop:"13px", 
                                backgroundColor:"#51C44A",
                                color:"#f3ede3",
                                "&:hover":{
                                    backgroundColor:"#103b0e",
                                    color:"#f3ede3"
                                } 
                            }}
                        >
                            RENT
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default Aboutus1;
