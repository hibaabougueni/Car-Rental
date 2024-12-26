import { Grid, Typography,Container, IconButton } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CategoryService from './../../services/CategoryService';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const Footer=()=>{
    const [categories, setCategories]= useState([{name:""}]);

    useEffect(()=>{
        CategoryService.findAll()
        .then((res)=>{
            setCategories(res.data);
        })
        .catch((error)=>{
            console.log("error", error);
        })
    },[]);

    return(
        <Grid sx={{backgroundColor:"#fdf9f3", color:"black", textAlign:"center"}}>
            <Grid container spacing={3} >
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <img src="src/assets/newlogo3.png" width="100%"  sx={{margin:"15px"}} /> 
                    <Typography sx={{margin:"15px"}}>
                       At RentDrive, we are passionate about providing exceptional car rental services to 
                       both residents and visitors in the city of Laayoune, Morocco. 
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography variant='h5' gutterBottom sx={{margin:"15px", fontWeight:"bold"}}>Our Vehicles</Typography>
                    {categories.map((cat)=>(
                       <Link to={`vehicules/${cat.name}`} style={{ textDecoration: "none" }} key={cat.id}><h5 style={{color:"black"}}><Typography variant='body1' sx={{margin:"15px"}}>{cat.name}</Typography></h5></Link> 
                    ))}
                    
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <a href="/" style={{textDecoration:"none", color:"black"}}><Typography variant='h6' sx={{margin:"15px", fontWeight:"bold"}}>Home</Typography></a>
                    <a href="/aboutus" style={{textDecoration:"none", color:"black"}}><Typography variant='h6' sx={{margin:"16px", fontWeight:"bold"}}>About Us</Typography></a>
                    <a href="/conditions" style={{textDecoration:"none", color:"black"}}><Typography variant='h6' sx={{margin:"16px", fontWeight:"bold"}}>Rent Conditions</Typography></a>
                    <a href="/contactus" style={{textDecoration:"none", color:"black"}}><Typography variant='h6' sx={{margin:"15px", fontWeight:"bold"}}>Contact us</Typography></a>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Typography variant='h5' sx={{margin:"15px", fontWeight:"bold"}}>Join Us</Typography>
                    <div>
                        <IconButton aria-label="Instagram" style={{ color: 'black' }} component="a" href="/">
                            <InstagramIcon />
                        </IconButton>
                        <IconButton aria-label="Facebook" style={{ color: 'black' }} component="a" href="/">
                            <FacebookIcon />
                        </IconButton>
                        <IconButton aria-label="WhatsApp" style={{ color: 'black' }} component="a" href="/">
                            <WhatsAppIcon />
                        </IconButton>
                        <IconButton aria-label="Email" style={{color:'black'}} component="a" href="/">
                            <EmailIcon /> 
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <hr></hr>
            <div>
                <h6>
                     &copy; {new Date().getFullYear()} RENT DRIVE All rights reserved.
                </h6>
            </div>
        </Grid>
    );
}

export default Footer;