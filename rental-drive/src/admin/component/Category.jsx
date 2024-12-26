import Header from "./Header";
import { Box, useTheme, Button, IconButton } from "@mui/material";
import { tokens } from "../theme";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CategoryService from "../../services/CategoryService";
import VehiculeService from "../../services/VehiculeService";

const Category=()=>{
    const theme=useTheme();
    const colors=tokens(theme.palette.mode);

    const navigate = useNavigate();
    const handleAddCat=()=>{
        navigate('/admin/addCategory')
    }

    const handleEdit=(id)=>{
        navigate(`/admin/editCategory/id/${id}`);
    };

    const handleDelete=(id)=>{
        CategoryService.deleteCat(id)
        .then(()=>{
            setCategories((prev)=>prev.filter(cat => cat.id !== id));
        }).catch(error=>{
            console.error("error", error);
        })
    };

    const [categories, setCategories]=useState([]);

    useEffect(()=>{
        CategoryService.findAll()
        .then(res=>{
            let categoriesData= res.data.map((cat, index)=>({
                id:cat.id,
                name:cat.name,
            }))
            setCategories(categoriesData);
        }).catch(error=>{
            console.error("error", error);
        })
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Category', width: 230 },
        { field: 'action', headerName: 'Action', width: 150, renderCell:(param)=>
                                                    <Box>
                                                        <IconButton onClick={()=>handleEdit(param.id)}><EditNoteIcon sx={{color:"green"}} /></IconButton>
                                                        <IconButton onClick={()=>handleDelete(param.id)}><DeleteIcon sx={{color:"red"}} /></IconButton>
                                                    </Box>
        },
    ];


    return(
        <Fragment>
            <Box m="20px">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Header title="Category" subtitle="View All Categories" />
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
                        ADD CATEGORY
                    </Button>
                </Box>
            </Box>
            <div style={{ height: 500, width: '50%', margin:'0 auto 0 auto' }}>
                <DataGrid
                    rows={categories}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                    }}
                    pageSizeOptions={[5, 7]}
                    
                    
                />
            </div>
        </Fragment>
    );
}
export default Category;