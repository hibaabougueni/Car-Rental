import { Typography, Grid, FormControl, InputLabel, Select,MenuItem, Checkbox, Button, Avatar } from "@mui/material";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import VehiculeService from "../../../services/VehiculeService";
import ReviewService from "../../../services/ReviewService";
import CartItemService from "../../../services/CartItemService";
import CartService from "../../../services/CartService";
import UserService from "../../../services/UserService";
import OrderService from "../../../services/OrderService";
import dayjs from 'dayjs';

import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import AirlineSeatLegroomNormalIcon from '@mui/icons-material/AirlineSeatLegroomNormal';
import EvStationIcon from '@mui/icons-material/EvStation';
import SettingsIcon from '@mui/icons-material/Settings';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import KeyIcon from '@mui/icons-material/Key';
import FlightClassIcon from '@mui/icons-material/FlightClass';

import Rating from '@mui/material/Rating';
import ProgressBar from "@ramonak/react-progress-bar";


const VehiculeDetails=({addToCart})=>{

    const token=localStorage.getItem("token");
        useEffect(()=>{
            if(token){
            UserService.getUser(token)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error("Error fetching user data", error);
            });
            }
        
        },[token]);

    const [user, setUser]= useState({});
    const [pickupDate, setPickupDate] = useState(null);
    const [returnDate, setReturnDate] = useState(null);
    const [babySeat, setBabySeat] = useState(0);

    const handleAddItem= async()=>{
        const cartItem={
            vehicule: vehicule,
            babySeat: babySeat,
            pickupDate: pickupDate ? pickupDate.toISOString() : null,
            pickupPlace: place,
            returnDate: returnDate ? returnDate.toISOString() : null,
            returnPlace: checked ? place : 'Other place',
            userId: user.id 
        };
        try {
            const response = await CartService.addItemToCart(cartItem, user.id);
            console.log('Item added to cart:', response.data);
            addToCart(cartItem);
            
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    }

    const [checked, setChecked]=useState(true);
    const handleCheck=(event)=>{
        setChecked(event.target.checked);
    };

    const [place, setPlace]= useState("");
    const handleChange=(event)=>{
        setPlace(event.target.value);
    };

    const [vehicule, setVehicule]= useState({});
    const {id} = useParams();

    useEffect(()=>{
        VehiculeService.findVehiculeById(id)
        .then(res=>{
            setVehicule(res.data);
        }).catch(error=>{
            console.log("error", error);
        });
    });

    const [reviews, setReviews]=useState([{}]);
    const [averageRatings, setAverageRatings] = useState(0);
    const [number, setNumber]=useState(0);
    const [five, setFive]=useState(0);
    const [four, setFour]=useState(0);
    const [three, setThree]=useState(0);
    const [two, setTwo]=useState(0);
    const [one, setOne]=useState(0);

    useEffect(()=>{
        ReviewService.findAllReviews(id)
        .then(res=>{
            const reviewsData = res.data;
            setReviews(reviewsData);

            // Calculate average ratings
            if (reviewsData.length > 0) {
                let total = 0;
                let five=0;
                let four=0;
                let three=0;
                let two=0;
                let one=0;
                reviewsData.forEach(review => {
                    total += review.rating;
                    if(review.rating >= 4.5){
                        five ++;
                    }else if(review.rating < 4.5 && review.rating >= 3.5){
                        four ++;
                    }else if(review.rating < 3.5 && review.rating >= 2.5){
                        three ++;
                    }else if(review.rating < 2.5 && review.rating >= 1.5){
                        two ++;
                    }else if(review.rating < 1.5 && review.rating >= 1){
                        one ++;
                    }

                });
                const avgRatings = total / reviewsData.length;   
                setAverageRatings(avgRatings.toFixed(2));
                setNumber(reviewsData.length);
                setOne(one);
                setTwo(two);
                setThree(three);
                setFour(four);
                setFive(five);
            } else {
                setNumber(0);
                setAverageRatings(0); // Handle the case where there are no reviews
            }
        }).catch(error=>{
            console.error("error",error);
        })
    },[]);

    const fiveStarPercentage = reviews.length > 0 ? ((five / reviews.length) * 100).toFixed(0)  : 0;
    const fourStarPercentage = reviews.length > 0 ? ((four / reviews.length) * 100).toFixed(0) : 0;
    const threeStarPercentage = reviews.length > 0 ? ((three / reviews.length) * 100).toFixed(0) : 0;
    const twoStarPercentage = reviews.length > 0 ? ((two / reviews.length) * 100).toFixed(0) : 0;
    const oneStarPercentage = reviews.length > 0 ? ((one / reviews.length) * 100).toFixed(0) : 0;

    const [disabledDates, setDisabledDates]= useState([]);
     
    useEffect(()=>{
        OrderService.findOrderByVehicule(id)
        .then((res)=>{
            const dates= res.data.filter((order)=> order.orderStatus !== "CANCELED")
                        .flatMap((order) => 
                            order.orderItems.map((item) => ({
                            pickupDate: dayjs(item.pickupDate)+1,
                            returnDate: dayjs(item.returnDate)+1,
                        })));
            setDisabledDates(dates);
        })
        .catch((error)=>{
            console.error("error happened ", error);
        })
    },[]);

    const isDisabledDate = (date) => {
        return disabledDates.some(disabledDate =>
            (date.isAfter(disabledDate.pickupDate, 'day') && date.isBefore(disabledDate.returnDate, 'day')) ||
            date.isSame(disabledDate.pickupDate, 'day') ||
            date.isSame(disabledDate.returnDate, 'day')
        );
    };


    return(
        <div className="container">
            <Grid container spacing={3} sx={{marginTop:"50px"}}>
                <Grid item xs={12} sm={7} md={7}>
                    <div style={{border:"2px solid #edeced"}}>
                    <img src={vehicule.imageURL} alt={vehicule.brand} width="100%" height="350px" style={{borderBottom:"2px solid #edeced"}}/>
                    <Grid container spacing={3} sx={{padding:"27px 10px"}}>
                        <Grid item xs={6} sm={6} md={4}>
                            <div style={{display:"flex"}}>
                                <EvStationIcon sx={{width:"30px", height:"30px",color:"#1d392b"}} />
                                <div style={{marginLeft:"7px"}} >
                                    <Typography variant="h6" sx={{fontWeight:"bold", fontFamily:"'Montserrat', arial", letterSpacing: "1px", color:"#1d392b"}}> Engine Type </Typography>
                                    <Typography variant="subtitle1" sx={{fontFamily:"'Montserrat', arial", color:"#1d392b"}}> {vehicule.engineType} </Typography>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={6} md={4}>
                            <div style={{display:"flex", marginLeft:"15px"}}>
                                <SettingsIcon sx={{width:"30px", height:"30px",color:"#1d392b"}} />
                                <div style={{marginLeft:"7px"}} >
                                    <Typography variant="h6" sx={{fontWeight:"bold", fontFamily:"'Montserrat', arial", letterSpacing: "1px", color:"#1d392b"}}> Transmission </Typography>
                                    <Typography variant="subtitle1" sx={{fontFamily:"'Montserrat', arial", color:"#1d392b"}}> {vehicule.transmission} </Typography>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={6} md={4}>
                            <div style={{display:"flex", marginLeft:"15px"}}>
                                <FlightClassIcon sx={{width:"30px", height:"30px",color:"#1d392b"}} />
                                <div style={{marginLeft:"7px"}} >
                                    <Typography variant="h6" sx={{fontWeight:"bold", fontFamily:"'Montserrat', arial", letterSpacing: "1px", color:"#1d392b"}}> Seats </Typography>
                                    <Typography variant="subtitle1" sx={{fontFamily:"'Montserrat', arial", color:"#1d392b"}}> {vehicule.seats} </Typography>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={6} md={4}>
                            <div style={{display:"flex"}}>
                                <KeyIcon sx={{width:"30px", height:"30px",color:"#1d392b"}} />
                                <div style={{marginLeft:"7px"}} >
                                    <Typography variant="h6" sx={{fontWeight:"bold", fontFamily:"'Montserrat', arial", letterSpacing: "1px", color:"#1d392b"}}> Doors </Typography>
                                    <Typography variant="subtitle1" sx={{fontFamily:"'Montserrat', arial", color:"#1d392b"}}> {vehicule.doors} </Typography>
                                </div>
                            </div>
                        </Grid>
                        {vehicule.gps && (
                        <Grid item xs={6} sm={6} md={4}>
                            <div style={{display:"flex", marginLeft:"15px"}}>
                                <GpsFixedIcon sx={{width:"30px", height:"30px",color:"#1d392b"}} />
                                <div style={{marginLeft:"7px"}} >
                                    <Typography variant="h6" sx={{fontWeight:"bold", fontFamily:"'Montserrat', arial", letterSpacing: "1px", color:"#1d392b"}}> GPS </Typography>
                                    <Typography variant="subtitle1" sx={{fontFamily:"'Montserrat', arial", color:"#1d392b"}}> {vehicule.gps} </Typography>
                                </div>
                            </div>
                        </Grid>) } <></>
                        {vehicule.ac && (
                        <Grid item xs={6} sm={6} md={4}>
                            <div style={{display:"flex", marginLeft:"15px"}}>
                                <AcUnitIcon sx={{width:"30px", height:"30px",color:"#1d392b"}} />
                                <div style={{marginLeft:"7px"}} >
                                    <Typography variant="h6" sx={{fontWeight:"bold", fontFamily:"'Montserrat', arial", letterSpacing: "1px", color:"#1d392b"}}> AC </Typography>
                                    <Typography variant="subtitle1" sx={{fontFamily:"'Montserrat', arial", color:"#1d392b"}}>  </Typography>
                                </div>
                            </div>
                        </Grid>) } <></>
                        </Grid>
                    </div>
                    
                         
                    
                </Grid>
                <Grid item xs={12} sm={5} md={5}>
                    <Typography variant="h4" sx={{fontWeight:"600", fontFamily:"'Montserrat', arial", letterSpacing: "1px"}}>{vehicule.brand} {vehicule.model} {vehicule.year}</Typography>
                    <div style={{display:"flex", margin:"25px 0"}}>
                        <Typography variant="h6" sx={{fontFamily:"'Montserrat', arial", letterSpacing: "1px"}}>Color : </Typography>
                        <div style={{marginLeft:"15px", border:`17px solid ${vehicule.color}`, borderRadius:"50%", width:"30px", height:"30px"}}> </div>
                    </div>
                    
                    <div style={{display:"flex"}}>
                        <Typography variant="h6" sx={{marginRight:"20px", marginLeft:"10px", fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>{vehicule.discountedPrice} DH/Day</Typography>
                        <Typography variant="h6" sx={{marginRight:"20px", color:"#c0bfbf" ,fontWeight:"600",textDecorationLine:"line-through", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>{vehicule.price} DH</Typography>
                        <Typography variant="h6" sx={{color:"#01b759", fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>{vehicule.discountPercent}% off</Typography>
                    </div>

                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DemoItem
                            label="Pickup Date" 
                            value={pickupDate}
                            onChange={newValue=>setPickupDate(newValue)}
                            sx={{marginTop:"25px"}}
                            >
                            <DateTimePicker  value={pickupDate}
                                shouldDisableDate={isDisabledDate}
                                onChange={setPickupDate}
                                renderInput={(params) => <TextField {...params} />} />
                            </DemoItem>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem
                            label="Return Date" 
                            value={returnDate}
                            onChange={newValue=>setReturnDate(newValue)}
                            sx={{marginTop:"15px"}}
                            >
                            <DateTimePicker value={returnDate}
                                shouldDisableDate={isDisabledDate}
                                onChange={setReturnDate}
                                renderInput={(params) => <TextField {...params} />}/>
                            </DemoItem>
                    </LocalizationProvider>

                    <Typography variant="body2" sx={{marginTop:"15px"}}>Rent Location</Typography>
                    <FormControl fullWidth sx={{marginTop:"10px"}}>
                            <InputLabel id="demo-simple-select-label" sx={{ fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>Pickup Place</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={place}
                            label="agence"
                            onChange={handleChange}
                

                            >
                            <MenuItem value="agence" sx={{ fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>Agence</MenuItem>
                            <MenuItem value="airport" sx={{ fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>Airport</MenuItem>
                            </Select>
                    </FormControl>

                    <div style={{display:"flex"}}>
                            <Checkbox
                            checked={checked}
                            onChange={handleCheck}
                            sx={{display:"block", color:"#54B435",
                                '&.Mui-checked': {
                                    color: "#51C44A", 
                                },
                                marginTop:"13px"
                            }}
                            inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <Typography variant="body2" sx={{marginTop:"27px", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>
                                Return In The Same Pickup Location 
                            </Typography>
                    </div>

                    <Button variant="contained" fullWidth onClick={handleAddItem}
                        sx={{marginTop:"3px", marginBottom:"10px",
                            padding:"6px 25px",
                            fontFamily: "'Montserrat', arial", letterSpacing: "1px",
                            
                                backgroundColor:"#51C44A",
                                "&:hover":{
                                    backgroundColor:"#103b0e",
                                    color:"white"
                                }
                            
                        }}
                    >
                        Rent Now
                    </Button>
                    
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={7} md={7}>
                        <Typography variant="h5"  sx={{margin:"30px 0 30px 25px",backgroundColor:"#D6EFD8", padding:"5px 25px", color:"#103b0e"}}>Rating</Typography>
                        <div style={{display:"flex", marginLeft:"25px"}}>
                            <Rating name="read-only" value={averageRatings} precision={0.5} readOnly size="large" />
                            <Typography variant="h6">{averageRatings}</Typography>
                        </div>
                        <Typography variant="subtitle2" sx={{marginLeft:"25px", color:"#c0bfbf"}}> ( {number} Evaluations )</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} sx={{marginLeft:"25px"}}>
                        <div style={{display:"flex", alignItems:"start"}}>
                            <Typography sx={{marginRight:"10px"}}>5 Stars</Typography>
                            <div style={{ flex: 1}}>
                                <ProgressBar completed={fiveStarPercentage }  width="100%" borderRadius="0px" bgColor="black" />
        
                            </div>
                            <Typography sx={{ marginLeft: "15px" }}>{five}</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} sx={{marginLeft:"25px"}}>
                        <div style={{display:"flex", alignItems:"start"}}>
                            <Typography sx={{marginRight:"10px"}}>4 Stars</Typography>
                            <div style={{ flex: 1}}>
                                <ProgressBar completed={fourStarPercentage }  width="100%" borderRadius="0px" bgColor="black" />
        
                            </div>
                            <Typography sx={{ marginLeft: "15px" }}>{four}</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} sx={{marginLeft:"25px"}}>
                        <div style={{display:"flex", alignItems:"start"}}>
                            <Typography sx={{marginRight:"10px"}}>3 Stars</Typography>
                            <div style={{ flex: 1}}>
                                <ProgressBar completed={threeStarPercentage }  width="100%" borderRadius="0px" bgColor="black" />
        
                            </div>
                            <Typography sx={{ marginLeft: "15px" }}>{three}</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} sx={{marginLeft:"25px"}}>
                        <div style={{display:"flex", alignItems:"start"}}>
                            <Typography sx={{marginRight:"10px"}}>2 Stars</Typography>
                            <div style={{ flex: 1}}>
                                <ProgressBar completed={twoStarPercentage } width="100%" borderRadius="0px" bgColor="black" />
        
                            </div>
                            <Typography sx={{ marginLeft: "15px" }}>{two}</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} sx={{marginLeft:"25px"}}>
                        <div style={{display:"flex", alignItems:"start"}}>
                            <Typography sx={{marginRight:"10px"}}>1 Star</Typography>
                            <div style={{ flex: 1}}>
                                <ProgressBar completed={oneStarPercentage }  width="100%" borderRadius="0px" bgColor="black" />
        
                            </div>
                            <Typography sx={{ marginLeft: "15px" }}>{one}</Typography>
                        </div>
                    </Grid>
                </Grid>        


                <Grid container spacing={2} sx={{marginTop:"30px"}}>
                    <Grid item xs={12} sm={7} md={7}>
                        <Typography variant="h5" sx={{margin:"30px 0 30px 25px",backgroundColor:"#D6EFD8", padding:"5px 25px", color:"#103b0e"}}>Comments</Typography>
                    </Grid>
                
                    {reviews.map((rev,index)=>(
                        <Grid item xs={12} sm={7} md={7} sx={{margin:"0px 30px"}}>
                        
                        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                                <div style={{display:"flex"}}>
                                    <Avatar sx={{width:"55px", height:"55px"}}/>
                                    <div style={{marginLeft:"15px"}}>
                                    <Typography>{user.email}</Typography>
                                        <Typography variant="subtitle1" sx={{color: "#c0bfbf"}}>{rev.createdAt}</Typography>  
                                    </div>
                                </div>
                                <Rating name="read-only" value={rev.rating} precision={0.5} readOnly />
                        </div>
                        <Typography variant="h6" sx={{margin:"20px 70px", fontFamily: "'Montserrat', arial", letterSpacing: "1px", fontSize:"16px"}}>{rev.review}</Typography>
                        <hr></hr>
                        </Grid>
                    ))}
                
                </Grid>

            </Grid>
        </div>
    );
    
}

export default VehiculeDetails;