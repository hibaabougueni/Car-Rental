import { useNavigate, useParams } from "react-router-dom";
import AirlineSeatLegroomNormalIcon from '@mui/icons-material/AirlineSeatLegroomNormal';
import EvStationIcon from '@mui/icons-material/EvStation';
import SettingsIcon from '@mui/icons-material/Settings';
import { Grid, Box, Typography, Button } from "@mui/material";
import VehiculeService from "./../../../services/VehiculeService";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';

const AvailableVehicules=()=>{

    const navigate= useNavigate();
    const [vehicules, setVehicules]=useState([]);
    const { pickupDate, returnDate } = useParams();


    useEffect(()=>{
        console.log("Pickup Date:", pickupDate);
        console.log("Return Date:", returnDate);
        if (pickupDate && returnDate) {
        const pickupDateString = dayjs(pickupDate).format('YYYY-MM-DDTHH:mm:ss');
        const returnDateString = dayjs(returnDate).format('YYYY-MM-DDTHH:mm:ss');
        VehiculeService.findVehiculeByDate(pickupDateString, returnDateString)
        .then(res=>{
            setVehicules(res.data);
        }).catch(error=>{
            console.error("error", error);
        })
    }
    },[pickupDate, returnDate])

    const handleClick=(id)=>{
        navigate(`/details/${id}`)
    }

    return (
        <div className="container" >
            <Grid container spacing={2} sx={{marginTop:"40px"}}>
                {vehicules.map((vehicule, index)=>(

                <Grid item xs={12} sm={6} md={4} sx={{marginTop:"15px"}}>
                <Grid container spacing={2} sx={{ backgroundColor: "#EDF1D6", border:"2px solid #edeced", borderRadius:"3px",width: "98%" }}>
                    <Grid item xs={6} sm={6} md={6}>
                        <Typography variant="h4" sx={{textTransform:"upperCase",color:"#1d392b",paddingLeft:"10px",fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>
                            {vehicule.brand}
                        </Typography>
                        <Typography variant="h5" sx={{textTransform:"upperCase",color:"#018943",paddingLeft:"20px",fontWeight:"550",fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>
                            {vehicule.model}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} >
                        <div style={{display: "flex", justifyContent:"end", marginRight:"27px",marginBottom:"7px"}}>
                            <AirlineSeatLegroomNormalIcon sx={{marginRight:"6px", color:"#1d392b"}}/>
                            <Typography sx={{color:"#737373"}}> {vehicule.seats} seats</Typography>
                        </div>
                        <div style={{display: "flex", justifyContent:"end", marginRight:"20px",marginBottom:"7px"}}>
                            <EvStationIcon sx={{marginRight:"6px", color:"#1d392b"}}/>
                            <Typography sx={{color:"#737373"}}> {vehicule.engineType}</Typography>
                        </div>
                        <div style={{display: "flex", justifyContent:"end", marginRight:"26px",marginBottom:"7px"}}>
                            <SettingsIcon sx={{marginRight:"7px", color:"#1d392b"}} />
                            <Typography sx={{color:"#737373"}}> {vehicule.transmission}</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <img src={vehicule.imageURL} alt="logo" width="95%" height="230px" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} sx={{display:"flex"}}>
                        <Typography sx={{marginRight:"20px", marginLeft:"10px", fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>{vehicule.discountedPrice} DH/Day</Typography>
                        <Typography sx={{marginRight:"20px", color:"#c0bfbf" ,fontWeight:"600",textDecorationLine:"line-through", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>{vehicule.price} DH</Typography>
                        <Typography sx={{color:"#01b759", fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>{vehicule.discountPercent}% off</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <div style={{display:"flex", justifyContent:"center"}}>
                            <Button variant="contained"
                                onClick={()=>handleClick(vehicule.id)}
                                sx={{marginTop:"3px", marginBottom:"10px",
                                    padding:"6px 25px",
                                    fontFamily: "'Montserrat', arial", letterSpacing: "1px",
                                    backgroundColor:"#54B435",
                                    "&:hover":{
                                        backgroundColor:"#01b759",
                                        color:"#1d392b"
                                    }
                                }}
                            >
                                View Details
                            </Button>
                        </div>
                        
                    </Grid>
                </Grid>
                </Grid>

                ))}
            
            </Grid>
        </div>
    );

}

export default AvailableVehicules;