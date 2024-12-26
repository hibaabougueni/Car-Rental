import React, { useEffect, useRef, useState } from "react";
import Grid from '@mui/material/Grid';
import { Box, IconButton, TextField, Typography, Button } from "@mui/material";
import emailjs from '@emailjs/browser';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { SnackbarProvider, useSnackbar } from 'notistack';

const Contactus = () => {

  const { enqueueSnackbar } = useSnackbar();

  const form = useRef();

  const variant="success";

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_pz99xl8', 'template_puj014z', form.current, {
        publicKey: 'h0M8u6DBTmqjahV7c',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          enqueueSnackbar('Your message was successfully sent!', {variant});
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );

      setFormData({
        user_firstname:"",
        user_lastname:"",
        user_email:"",
        message:"",
      });

  };

  const [formData, setFormData]=useState({
    user_firstname:"",
    user_lastname:"",
    user_email:"",
    message:"",
  });

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData({...formData, [name]:value});
  };



  return(
    <Box  >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} style={{marginTop:"70px"}}>
            <form ref={form} onSubmit={sendEmail} style={{padding: "0rem 1rem"}}>
              <Grid item xs={12} sm={12} sx={{marginLeft:"20px"}}>
                <Typography variant="h5">Send us a message</Typography>
              </Grid>
              <Grid sx={{display:"flex", margin:"30px 15px"}}>
                <Grid item xs={12} sm={6} sx={{marginRight:"10px"}}>
                    <TextField
                    required 
                    fullWidth
                    value={formData.user_firstname}
                    onChange={handleChange}
                    label="First Name"
                    name="user_firstname"
                    InputLabelProps={{
                      sx: {
                          '&.Mui-focused': {
                              color: "#212A3E",
                          },
                      },
                    }}
                    InputProps={{
                      sx: {
                          '&.Mui-focused': {
                              '& .MuiOutlinedInput-notchedOutline': {
                              borderColor:"#212A3E", 
                              }
                          },
                      },
                    }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                    required
                    fullWidth
                    value={formData.user_lastname}
                    onChange={handleChange}
                    label="Last Name"
                    name="user_lastname"
                    InputLabelProps={{
                      sx: {
                          '&.Mui-focused': {
                              color: "#212A3E",
                          },
                      },
                    }}
                    InputProps={{
                      sx: {
                          '&.Mui-focused': {
                              '& .MuiOutlinedInput-notchedOutline': {
                              borderColor:"#212A3E", 
                              }
                          },
                      },
                    }}
                    />
                </Grid>
              </Grid>
                
                <Grid item xs={12} sm={12} sx={{margin:"30px 15px"}}>
                    <TextField
                    required 
                    fullWidth
                    value={formData.user_email}
                    onChange={handleChange}
                    label="Email"
                    name="user_email"
                    InputLabelProps={{
                      sx: {
                          '&.Mui-focused': {
                              color: "#212A3E",
                          },
                      },
                    }}
                    InputProps={{
                      sx: {
                          '&.Mui-focused': {
                              '& .MuiOutlinedInput-notchedOutline': {
                              borderColor:"#212A3E", 
                              }
                          },
                      },
                    }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} sx={{margin:"30px 15px", display:"flex"}}>
                   <TextField
                    required
                    fullWidth
                    value={formData.message}
                    onChange={handleChange}
                    id="outlined-multiline-static"
                    label="Message"
                    name="message"
                    placeholder="Message"
                    rows={4}
                    multiline
                    InputLabelProps={{
                      sx: {
                          '&.Mui-focused': {
                              color: "#212A3E",
                          },
                      },
                    }}
                    InputProps={{
                      sx: {
                          '&.Mui-focused': {
                              '& .MuiOutlinedInput-notchedOutline': {
                              borderColor:"#212A3E",
                              }
                          },
                      },
                    }}
                    />
                </Grid>
                <Grid sx={{display:"flex", justifyContent:"center", alignItems:"center", marginBottom:"20px"}}>
                  <Button
                      type="submit"
                      sx={{
                        margin:"20px 0 5px 5px",
                        backgroundColor:"#103b0e",
                        
                        color:"#f3ede3",
                        "&:hover":{
                            backgroundColor:"#51C44A",
                            color:"#103b0e"
                        } ,
                        padding:"8px 35px 8px 35px"
                      }}
                    >
                      Send
                  </Button>
                </Grid>
                

            </form>
        </Grid>
        <Grid item xs={12} sm={4} sx={{backgroundImage: "url('src/assets/bg.png')",backgroundSize: "cover", color:"white", textAlign:"center", marginTop:"10px"}}>
            <Grid item xs={12} sm={12} sx={{marginTop:"30px"}}>
              <Typography variant="h5" >
                Contact Information
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ display:"flex", margin:"30px 0 30px 10px"}}>
              <LocationOnIcon sx={{color:"white"}}/>
              <Typography >Centre d'affaires Ahain boulevard Samara, 70000</Typography>
            </Grid> 
            <Grid item xs={12} sm={12} sx={{ display:"flex",margin:"30px 0 30px 10px"}}>
              <PhoneIcon sx={{color:"white"}}/>
              <Typography >+212 6 32 12 32 90</Typography>
            </Grid> 
            <Grid item xs={12} sm={12} sx={{ display:"flex",margin:"30px 0 30px 10px"}}>
              <EmailIcon sx={{color:"white"}}/>
              <Typography >RenDrive.contact@gmail.com</Typography>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ display:"flex", margin:"30px 0 30px 10px"}}>
              <IconButton sx={{backgroundColor:"white", width:"30px", height:"30px","&:hover":{backgroundColor:"#103b0e"}}}>
                <FacebookIcon sx={{color:"#103b0e", "&:hover":{color:"white"}}}/>
              </IconButton>
              <IconButton sx={{backgroundColor:"white", width:"30px", height:"30px", marginLeft:"14px","&:hover":{backgroundColor:"#103b0e"}}}>
                <InstagramIcon sx={{color:"#103b0e", "&:hover":{color:"white"}}}/>
              </IconButton>
            </Grid>             
        </Grid>
      </Grid>
      <Grid item xs={12} >
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3550.772868885761!2d-13.177018024767566!3d27.13196307651717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc360984cae9c3d7%3A0xfe9e680c42646c44!2sWeb%20Services%20SH%20%3A%20Agence%20de%20marketing%20digital!5e0!3m2!1sfr!2sus!4v1722104681762!5m2!1sfr!2sus"
        width="100%" height="700" 
        allowFullScreen
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="map"
        >
        </iframe>
      </Grid>
    </Box>
  );
};

export default function IntegrationNotistack(){
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Contactus />
    </SnackbarProvider>
  );
}
