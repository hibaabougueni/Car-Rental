import { Box, Grid,useTheme, Button,Checkbox, Typography, FormControl, InputLabel, Select,MenuItem } from "@mui/material";
import { useState, React, useEffect } from "react";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from "react-router-dom";
import CategoryService from "./../../services/CategoryService";
import VehiculeService from "../../services/VehiculeService";
import dayjs from 'dayjs';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';


const Home=()=>{

    const navigate=useNavigate();
    const [vehicules, setVehicules]= useState([]);
    const [pickupDate, setPickupDate]= useState(dayjs());
    const [returnDate, setReturnDate]= useState(dayjs());
    useEffect(()=>{
        if (pickupDate && returnDate) {
            VehiculeService.findVehiculeByDate(pickupDate, returnDate)
            .then((res)=>{
                setVehicules(res.data);
            })
            .catch((error)=>{
                console.error("error", error);
            })
        }
    }, [pickupDate, returnDate])

    const handleBrowse=()=>{
        navigate(`/available/${pickupDate}/${returnDate}`);
    };


    const [categories, setCategories]= useState([{
        name:"",
        imgURL:"",
    }]);

    useEffect(()=>{
        CategoryService.findAll()
        .then(res=>{
            setCategories(res.data);
        }).catch(error=>{
            console.error("error", error);
        })
    },[])

   

    
    const handleClick=()=>{
        navigate("/vehicules");
    }


    const [checked, setChecked]=useState(true);
    const handleCheck=(event)=>{
        setChecked(event.target.checked);
    };

    const [place, setPlace]= useState("");
    const handleChange=(event)=>{
        setPlace(event.target.value);
    };


    return(

        <Box>
            <Grid container spacing={2}>
            <Grid container spacing={2} sx={{ paddingTop: '150px', paddingLeft:'7%', paddingRight:"7%", 
                    backgroundImage:'url("src/assets/pic2.jpg")', 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height:"650px"}} 
            >
                <Grid item xs={12} sm={6} md={4}>
                    <form style={{backgroundColor:"#f3ede3", padding:"20px", borderRadius:"10px"}} >
                        <Typography variant="h5" sx={{ textAlign:"center",fontFamily: "'Montserrat', arial", fontWeight:"600",letterSpacing: "1px", color:"#103b0e"}}>Reserve a Vehicle</Typography>
                        
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DemoItem
                            label="Pickup" 
                            valueType="date time"
                            value={pickupDate}
                            onChange={newValue=>setPickupDate(newValue)}
                            sx={{marginTop:"13px"}}
                            >
                            <DateTimePicker  value={pickupDate}
                                onChange={setPickupDate}
                                renderInput={(params) => <TextField {...params} />}/>
                            </DemoItem>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem
                            label="Return" 
                            valueType="date time"
                            value={returnDate}
                            onChange={newValue=>setReturnDate(newValue)}
                            sx={{marginTop:"13px"}}
                            >
                            <DateTimePicker value={returnDate}
                                onChange={setReturnDate}
                                renderInput={(params) => <TextField {...params} />}/>
                            </DemoItem>
                        </LocalizationProvider>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Button variant="contained"
                                    onClick={handleBrowse}
                                    sx={{marginTop:"13px", 
                                        backgroundColor:"#103b0e",
                                        "&:hover":{
                                            backgroundColor:"#51C44A",
                                            color:"#103b0e"
                                        }
                                    }}
                            >
                            Browse Vehicles
                        </Button>
                        </div>
                        {vehicules.length === 0 ? (
                            <Typography sx={{color:"red"}}>No Vehicles Available, Try later.</Typography>
                        ): <></>}
                    </form>
                </Grid>
                
            </Grid> 
            <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography variant="h1" sx={{color:"#103b0e",fontFamily: "'Montserrat', arial", letterSpacing: "1px", fontWeight:"600", textAlign:"center", margin:"15px 0"}}>
                            Find what moves you
                        </Typography>
                            <Typography  variant="h4" sx={{ color:"#103b0e",fontFamily: "'Montserrat', arial", letterSpacing: "1px", fontWeight:"600", textAlign:"center"}}>
                                Whenever you want, wherever you want
                            </Typography>
                            <div style={{backgroundColor:"#90ee90", margin:"-24px 300px 10px 300px", zIndex:"-1", paddingTop:"8px", height:"45px"}}></div>
                    </Grid>
                    
                </Grid>

            <Grid container spacing={2} sx={{backgroundColor:"#51C44A", marginTop:"50px"}}>
                    <Grid item sx={12} md={12} sm={12}>
                        <Typography variant="h3" sx={{margin:"33px", fontFamily: "'Montserrat', arial", letterSpacing: "1px", fontWeight:"600", textAlign:"center", color:"white"}}>
                            Meet the Fleet
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Box sx={{ width: "100%", flexGrow: 1, backgroundColor:"#51C44A", height:"38rem" }}>
                <div className="container">
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        loop={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                        }}
                        pagination={{ el: '.swiper-pagination', clickable: true }}
                        navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                        clickable: true,
                        }}
                        modules={[EffectCoverflow, Pagination, Navigation]}
                        className="swiper_container"
                    >
                        {categories.map((cat)=>(
                            <SwiperSlide>
                                <Card sx={{ maxWidth: 345, boxShadow:"4", backgroundColor:"#f3ede3" }}>
                                    <CardMedia
                                        sx={{ height: 250 }}
                                        image={cat.imgURL}
                                        title="green iguana"
                                    />
                                    <CardContent sx={{height:"120px"}}>
                                        <Typography gutterBottom variant="h4" component="div" sx={{fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>
                                            {cat.name}
                                        </Typography>
                                        <CardActions>
                                            <Button size="medium" sx={{marginLeft:"210px"}} onClick={()=>navigate(`/vehicules/${cat.name}`)}>See More</Button>
                                        </CardActions>
                                    </CardContent>
                                </Card>
                            </SwiperSlide>
                        ))}
                    

                        <div className="slider-controler">
                        <div className="swiper-button-prev slider-arrow">
                            <ion-icon name="arrow-back-outline"></ion-icon>
                        </div>
                        <div className="swiper-button-next slider-arrow">
                            <ion-icon name="arrow-forward-outline"></ion-icon>
                        </div>
                        <div className="swiper-pagination"></div>
                        </div>
                    </Swiper>
                    </div>
            </Box>
            <Grid container spacing={2} sx={{marginTop:"50px", marginBottom:"90px"}}>
                <Grid item xs={12} md={6} sm={6} >
                    <img src="src/assets/pic3.png" 
                    width="100%" height="300px"
                    
                    style={{paddingTop:"20px", paddingLeft:"20px"}}
                    />
                </Grid>
                <Grid item xs={12} md={6} sm={6} container 
                    direction="column" 
                    justifyContent="center">
                    <div >
                        <Typography variant="h4" sx={{margin:"5px 20px 15px 33px",fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>
                        Rent vehicles for all occasions
                    </Typography>
                    <Typography variant="subtitle1" sx={{margin:"5px 20px 15px 33px", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>
                        Explore an incredible selection of cars, from the most common to the most extraordinary.
                    </Typography>  
                    <div style={{margin:"5px 0 15px 33px"}}>
                       <Button variant="contained" onClick={handleClick}
                            sx={{marginTop:"13px", 
                                backgroundColor:"#103b0e",
                                "&:hover":{
                                    backgroundColor:"#51C44A",
                                    color:"#103b0e"
                                }
                            }}
                       >
                        Explore    
                        </Button> 
                    </div> 
                    </div>
                   
                      
                </Grid>
            </Grid>
        </Box>
    )
}

export default Home;