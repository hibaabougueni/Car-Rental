import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./../../App.css";
import { tokens } from "../theme"; 
import { Box, Button, Grid, TextField, useTheme } from "@mui/material";
import {Fragment, useState} from "react";
import CategoryService from "../../services/CategoryService";

const AddCategory=()=>{
    const theme= useTheme();
    const colors= tokens(theme.palette.mode);

    const [category, setCategory]= useState({
        name:"",
        imgURL:"",
    });

    const saveCategory= async (e)=>{
        e.preventDefault();
        try {
            await CategoryService.addCat(category);
            navigate('/admin/category');
        } catch (error) {
            console.error("There was an error adding the category!", error);
        }
        
    };

    const handleChange=(e)=>{
        const { name, value } = e.target;
        setCategory((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const navigate= useNavigate();
    const handleAddVehicule=()=>{
        navigate('/admin/addVehicule');
    }

    return(
        <Fragment className="addCategory" >
                    <Box m="20px">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Header title="ADD CATEGORY" subtitle="Enter All Informations" />
                        <Button variant="contained" 
                            onClick={handleAddVehicule}
                            sx={{
                                backgroundColor:`${colors.thirdDegree}`,
                                color:`${colors.text}`,
                                "&:hover":{
                                    backgroundColor:`${colors.text}`,
                                    color:`${colors.fourthDegree}`,
                                },
                            }}
                        >
                            Add Vehicle
                        </Button>
                    </Box>
                    </Box>
                    <form style={{padding: "0rem 1rem"}} onSubmit={saveCategory}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                            <TextField 
                                fullWidth
                                label="Image URL"
                                name="imgURL"
                                value={category.imgURL}
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
                            <Grid item xs={12}>
                                <TextField 
                                    fullWidth
                                    label="name"
                                    name="name"
                                    value={category.name}
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
                    
                                >
                                    Add New Category
                                </Button>

                            </Grid>
                        </Grid>
                    </form>
            </Fragment>
    );
    
}
export default AddCategory;