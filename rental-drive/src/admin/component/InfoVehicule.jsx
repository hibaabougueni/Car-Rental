import { Button,Box, useTheme,List, ListItem, ListItemText, Card, CardActionArea, CardContent,Typography, CardMedia } from "@mui/material";
import Header from "./Header";
import { tokens } from "../theme";
import { useNavigate, useParams } from "react-router-dom";
import VehiculeService from "../../services/VehiculeService";
import {useState, useEffect} from "react";

const InfoVehicule=()=>{
    const theme=useTheme();
    const colors=tokens(theme.palette.mode);

    const navigate=useNavigate();
    const handleClick=()=>{
        navigate("/admin/vehicule");
    };

    const { id } = useParams();
    const [vehicule, setVehicule]=useState({
        category:{
            name:"",
        }
    });

    useEffect(() => {
        VehiculeService.findVehiculeById(id)
            .then(response => {
                setVehicule(response.data);
            })
            .catch(error => {
                console.error("Error fetching vehicule:", error);
            });
    }, [id]);

    const listItems = [
        { label: "MODEL", value: vehicule.model },
        { label: "YEAR", value: vehicule.year },
        { label: "CATEGORY", value: vehicule.category.name},
        { label: "COLOR", value: vehicule.color },
        { label: "ENGINE TYPE", value: vehicule.engineType },
        { label: "TRANSMISSION", value: vehicule.transmission },
        { label: "NUMBER OF SEATS", value: vehicule.seats },
        { label: "NUMBER OF DOORS", value: vehicule.doors},
        { label: "TRUNK CAPACITY", value: vehicule.trunkCapacity},
        { label: "PRICE", value: vehicule.price},
        { label: "DISCOUNT", value: vehicule.discountPercent},
        { label: "DISCOUNTED PRICE", value: vehicule.discountedPrice},
        { label: "AC", value: vehicule.ac},
        { label: "GPS", value: vehicule.gps},
        { label: "AVAILABILITY", value: vehicule.availability},

      ];

    return(
        <Box>
            <Box m="20px">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Header title="Vehicle's Information" subtitle="View All Information" />
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
            </Box>
                <Card sx={{ maxWidth: 800,
                        margin: '0 auto',
                        backgroundColor:`${colors.thirdDegree}`, 
                 }}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="170"
                        image={vehicule.imageURL}
                        alt="Vehicule Image"
                        
                        style={{ width: '50%', margin: '15px auto 0 auto', }}
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {vehicule.brand}
                        </Typography>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px', rowGap: '5px' }}>
                            {listItems.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={`${item.label}: ${item.value}`} />
                            </ListItem>
                            ))}
                        </div>
                        </CardContent>
                    </CardActionArea>
            </Card>
        </Box>
    )

}

export default InfoVehicule;