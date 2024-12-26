import { useNavigate, useParams } from "react-router-dom";
import { Button,Box,Grid, TextField , useTheme} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { tokens } from "../theme";
import CategoryService from "../../services/CategoryService";
import Header from "./Header";

const EditCategory=()=>{

    const theme=useTheme();
    const colors=tokens(theme.palette.mode);

    const {id}= useParams();

    const navigate=useNavigate();
    const handleBack=()=>{
        navigate("/admin/category");
    }

    const[category, setCategory]=useState({
        name:"",
        imgURL:"",
    });

    useEffect(()=>{
        CategoryService.findCatById(id)
        .then(res=>{
            setCategory(res.data);
        })
    },[])

    const handleChange=(e)=>{
        const { name, value } = e.target;
        setCategory((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const editCat=(e)=>{
        e.preventDefault();
        let cat={
            name:category.name,
            imgURL:category.imgURL,
        };
        CategoryService.updateCat(id,cat)
        .then(()=>{
            navigate('/admin/category');
        }).catch(error=>{
            console.error("error", error);
        })
    }

    return(
        <Fragment className="addCategory" >
            <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="EDIT CATEGORY" subtitle="Edit Category" />
                <Button variant="contained" 
                    onClick={handleBack}
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
            <form style={{padding: "0rem 1rem"}} onSubmit={editCat}>
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
                            Update Category
                        </Button>

                    </Grid>
                </Grid>
            </form>
        </Fragment>
    );
}

export default EditCategory;