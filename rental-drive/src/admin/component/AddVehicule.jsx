import { MenuItem, Button, useTheme, Checkbox, FormControl, Select, InputLabel, FormControlLabel, Grid, TextField, Box} from "@mui/material";
import { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./../../App.css";
import { tokens } from "../theme"; 
import VehiculeService from "../../services/VehiculeService";
import CategoryService from "../../services/CategoryService";

const AddVehicule=()=>{

    const theme= useTheme();
    const colors= tokens(theme.palette.mode);

    const [vehiculeData, setVehiculeData]= useState({
        brand:"",
        category: "",
        model:"",
        year:"",
        imageURL:"",
        color:"",
        availability:"",
        engineType:"",
        transmission:"",
        price:"",
        discountPercent:"",
        discountPrice:"",
        seats:"",
        doors:"",
        trunkCapacity:"",
        ac:"",
        gps:"",
    });

    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        CategoryService.findAll()
        .then(res=>{
            let categoriesData=res.data.map((cat,index)=>({
                id: cat.id,
                name:cat.name,
            }));
            setCategories(categoriesData);
        }).catch(error=>{
            console.error("error", error);
        })
    })


    const saveVehicule=(e)=>{
        e.preventDefault();
        let vehicule={
            brand:vehiculeData.brand,
            category: {id: vehiculeData.category},
            model:vehiculeData.model,
            year:vehiculeData.year,
            imageURL:vehiculeData.imageURL,
            color:vehiculeData.color,
            availability:checkedState.available,
            engineType:vehiculeData.engineType,
            transmission:vehiculeData.transmission,
            price:vehiculeData.price,
            discountPercent:vehiculeData.discountPercent,
            discountedPrice:vehiculeData.discountPrice,
            seats:vehiculeData.seats,
            doors:vehiculeData.doors,
            trunkCapacity:vehiculeData.trunkCapacity,
            ac:checkedState.ac,
            gps:checkedState.gps,
        }
        
        VehiculeService.addVehicule(vehicule).then(response => {
            navigate('/admin/vehicule');
        })
        .catch(error => {
            alert("Failed to add vehicule. Please try again.");
        });
            
    }

    const handleChange=(e)=>{
        const {name, value}= e.target;
        setVehiculeData((prev)=>{
            let updateState={...prev, [name]: value};
            if (name === "discountPercent" || (name === "price" && prev.discountPercent)) {
                const discountPercent = name === "discountPercent" ? value : prev.discountPercent;
                const price = name === "price" ? value : prev.price;
                if (discountPercent && price) {
                    updateState.discountPrice = price - (price * discountPercent) / 100;
                }
              }
              return updateState;
        })
    }
    const [checkedState, setCheckedState]= useState({
        available: true,
        gps:true,
        ac: true,
    });
    const handleCheck = (event) => {
        const{name, checked}=event.target;
        setCheckedState((prev) =>({
            ...prev,
            [name]: checked,
        }));
      };

    const navigate = useNavigate();
    const handleAddCat=()=>{
        navigate('/admin/addCategory')
    }
    return(
        <Fragment className="addVehicule" >
            <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="ADD VEHICULE" subtitle="Enter All Informations" />
                <Button variant="contained" 
                    onClick={handleAddCat}
                    sx={{
                        backgroundColor:`${colors.thirdDegree}`,
                        color:`${colors.text}`,
                        "&:hover":{
                            backgroundColor:`${colors.text}`,
                            color:`${colors.fourthDegree}`,
                        },
                    }}
                >
                    Add Category
                </Button>
            </Box>
            </Box>
            <form style={{padding: "0rem 1rem"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            fullWidth
                            label="Image URL"
                            name="imageURL"
                            value={vehiculeData.imageURL}
                            onChange={handleChange}
                            InputLabelProps={{
                                sx: {
                                    '&.Mui-focused': {
                                        color: `${colors.text}`,
                                    },
                                },
                            }}
                            InputProps={{
                                sx: {
                                    '&.Mui-focused': {
                                        '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor:`${colors.text}`, 
                                        }
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            fullWidth
                            label="Color"
                            name="color"
                            value={vehiculeData.color}
                            onChange={handleChange}
                            InputLabelProps={{
                                sx: {
                                    '&.Mui-focused': {
                                        color: `${colors.text}`,
                                    },
                                },
                            }}
                            InputProps={{
                                sx: {
                                    '&.Mui-focused': {
                                        '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor:`${colors.text}`, 
                                        }
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel
                            sx={{
                               
                                '&.Mui-focused': {
                                    color: `${colors.text}`, 
                                },
                            }}
                        >Category</InputLabel>
                            <Select 
                                
                                label="Category"
                                name="category"
                                value={vehiculeData.category}
                                onChange={handleChange}
                                sx={{
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: `${colors.text}`, 
                                    },
                                }}
                                variant="outlined"
                            >
                                {categories.map((cat)=>(
                                    <MenuItem value={cat.id} key={cat.id} >{cat.name}</MenuItem>
                                )
                                )}
                            </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField 
                            fullWidth
                            label="Brand"
                            name="brand"
                            value={vehiculeData.brand}
                            onChange={handleChange}
                            InputLabelProps={{
                                sx: {
                                    '&.Mui-focused': {
                                        color: `${colors.text}`,
                                    },
                                },
                            }}
                            InputProps={{
                                sx: {
                                    '&.Mui-focused': {
                                        '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor:`${colors.text}`, 
                                        }
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField 
                            fullWidth
                            label="Model"
                            name="model"
                            value={vehiculeData.model}
                            onChange={handleChange}
                            InputLabelProps={{
                                sx: {
                                    '&.Mui-focused': {
                                        color: `${colors.text}`,
                                    },
                                },
                            }}
                            InputProps={{
                                sx: {
                                    '&.Mui-focused': {
                                        '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor:`${colors.text}`, 
                                        }
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField 
                            fullWidth
                            label="Year"
                            name="year"
                            value={vehiculeData.year}
                            onChange={handleChange}
                            InputLabelProps={{
                                sx: {
                                    '&.Mui-focused': {
                                        color: `${colors.text}`,
                                    },
                                },
                            }}
                            InputProps={{
                                sx: {
                                    '&.Mui-focused': {
                                        '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor:`${colors.text}`, 
                                        }
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <TextField 
                            fullWidth
                            label="Price"
                            name="price"
                            value={vehiculeData.price}
                            onChange={handleChange}
                            InputLabelProps={{
                                sx: {
                                    '&.Mui-focused': {
                                        color: `${colors.text}`,
                                    },
                                },
                            }}
                            InputProps={{
                                sx: {
                                    '&.Mui-focused': {
                                        '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor:`${colors.text}`, 
                                        }
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <TextField 
                            fullWidth
                            label="Discount Percent"
                            name="discountPercent"
                            value={vehiculeData.discountPercent}
                            onChange={handleChange}
                            InputLabelProps={{
                                sx: {
                                    '&.Mui-focused': {
                                        color: `${colors.text}`,
                                    },
                                },
                            }}
                            InputProps={{
                                sx: {
                                    '&.Mui-focused': {
                                        '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor:`${colors.text}`, 
                                        }
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <TextField 
                            fullWidth
                            label="Discounted Price"
                            name="discountPrice"
                            value={vehiculeData.discountPrice}
                            onChange={handleChange}
                            InputLabelProps={{
                                sx: {
                                    '&.Mui-focused': {
                                        color: `${colors.text}`,
                                    },
                                },
                            }}
                            InputProps={{
                                sx: {
                                    '&.Mui-focused': {
                                        '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor:`${colors.text}`, 
                                        }
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            fullWidth
                            label="EngineType"
                            name="engineType"
                            value={vehiculeData.engineType}
                            onChange={handleChange}
                            InputLabelProps={{
                                sx: {
                                    '&.Mui-focused': {
                                        color: `${colors.text}`,
                                    },
                                },
                            }}
                            InputProps={{
                                sx: {
                                    '&.Mui-focused': {
                                        '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor:`${colors.text}`,
                                        }
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField 
                            fullWidth
                            label="Transmission"
                            name="transmission"
                            value={vehiculeData.transmission}
                            onChange={handleChange}
                            InputLabelProps={{
                                sx: {
                                    '&.Mui-focused': {
                                        color: `${colors.text}`,
                                    },
                                },
                            }}
                            InputProps={{
                                sx: {
                                    '&.Mui-focused': {
                                        '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor:`${colors.text}`, 
                                        }
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <TextField 
                            fullWidth
                            type="number"
                            label="Number Of Seats"
                            name="seats"
                            value={vehiculeData.seats}
                            onChange={handleChange}
                            InputLabelProps={{
                                sx: {
                                    '&.Mui-focused': {
                                        color: `${colors.text}`,
                                    },
                                },
                            }}
                            InputProps={{
                                sx: {
                                    '&.Mui-focused': {
                                        '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor:`${colors.text}`, 
                                        }
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <TextField 
                            fullWidth
                            type="number"
                            label="Number Of Doors"
                            name="doors"
                            value={vehiculeData.doors}
                            onChange={handleChange}
                            InputLabelProps={{
                                sx: {
                                    '&.Mui-focused': {
                                        color: `${colors.text}`,
                                    },
                                },
                            }}
                            InputProps={{
                                sx: {
                                    '&.Mui-focused': {
                                        '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor:`${colors.text}`, 
                                        }
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    <TextField 
                            fullWidth
                            type="number"
                            label="Trunk Capacity"
                            name="trunkCapacity"
                            value={vehiculeData.trunkCapacity}
                            onChange={handleChange}
                            InputLabelProps={{
                                sx: {
                                    '&.Mui-focused': {
                                        color: `${colors.text}`,
                                    },
                                },
                            }}
                            InputProps={{
                                sx: {
                                    '&.Mui-focused': {
                                        '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor:`${colors.text}`, 
                                        }
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                         <FormControlLabel
                            control={
                                <Checkbox
                                    label="Available"
                                    name="available"
                                    checked={checkedState.available}
                                    onChange={handleCheck}
                                    inputProps={{'aria-label': 'Available'}}
                                    sx={{
                                        '&.Mui-checked': {
                                            color: colors.text, 
                                        },
                                    }}
                                />
                            }
                            label="Available"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    label="GPS"
                                    name="gps"
                                    checked={checkedState.gps}
                                    onChange={handleCheck}
                                    inputProps={{'aria-label': 'gps'}}
                                    sx={{
                                        '&.Mui-checked': {
                                            color: colors.text, 
                                        },
                                    }}
                                />
                            }
                            label="GPS"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    label="AC"
                                    name="ac"
                                    checked={checkedState.ac}
                                    onChange={handleCheck}
                                    inputProps={{'aria-label': 'ac'}}
                                    sx={{
                                        '&.Mui-checked': {
                                            color: colors.text, 
                                        },
                                    }}
                                />
                            }
                            label="AC"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            variant="contained"
                            sx={{
                                backgroundColor:`${colors.thirdDegree}`,
                                color:`${colors.text}`,
                                "&:hover":{
                                    backgroundColor:`${colors.text}`,
                                    color:`${colors.fourthDegree}`,
                                },
                            }}
                            size="large"
                            type="submit"
                            onClick={saveVehicule}
                        >
                            Add New Vehicle
                        </Button>

                    </Grid>
                </Grid>
            </form>
        </Fragment>
    )

}

export default AddVehicule;