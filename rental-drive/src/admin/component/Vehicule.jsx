import Header from "./Header";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button,Avatar, useTheme, IconButton} from "@mui/material";
import { tokens } from "../theme";
import { DataGrid } from '@mui/x-data-grid';
import VehiculeService from "../../services/VehiculeService";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import InfoIcon from '@mui/icons-material/Info';

const Vehicule=()=>{

    const theme= useTheme();
    const colors= tokens(theme.palette.mode);
    

    const navigate= useNavigate();
    const handleAllVehicule=()=>{
        navigate('/admin/addVehicule');
    };

    const handleEdit=(id)=>{
        navigate(`/admin/editVehicule/id/${id}`);
    };

    const handleDelete=(id)=>{
        VehiculeService.deleteVehicule(id)
            .then(()=>{
                setVehicules((prevVehicules) => prevVehicules.filter(vehicule => vehicule.id !== id));
            }).catch(error=>{
                console.error("error deleting vehicule");
            })
    };

    const handleInfo=(id)=>{
        navigate(`/admin/infoVehicule/id/${id}`);
    }

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  {field:'image', headerName:'Image', width:130, renderCell: (params) => <Avatar src={params.value} sx={{ width: 50, height: 50 }} /> },
  { field: 'brand', headerName: 'Brand', width: 130 },
  { field: 'category', headerName: 'Category', width: 130 },
  { field: 'model', headerName: 'Model', width: 130 },

  { field: 'engineType', headerName: 'Engine Type', width: 90 },
  { field: 'transmission', headerName: 'Transmission', width: 95 },
  { field: 'price', headerName: 'Price', width: 80 },
  { field: 'discountPercent', headerName: 'Discount Percent', width: 80 },
  { field: 'discountedPrice', headerName: 'Discounted Price', width: 80 },

   { field: 'availability', headerName: 'Available', width: 80 },

    {field:'action', headerName:'Action', width:130, renderCell:(params)=><Box>
                                                                            <IconButton onClick={()=>handleEdit(params.id)}><EditNoteIcon sx={{color:'green'}}/></IconButton>
                                                                            <IconButton onClick={()=>handleInfo(params.id)}><InfoIcon sx={{color:'orange'}}/></IconButton>
                                                                            <IconButton onClick={()=>handleDelete(params.id)}><DeleteIcon sx={{color:'red'}}/></IconButton>
                                                                         </Box>},

];

const [vehicules, setVehicules] = useState([]);

    useEffect(() => {
        VehiculeService.findAllVehicules()
            .then(response => {
                const vehiculeData = response.data.map((vehicule, index) => ({
                    id: vehicule.id,
                    image: vehicule.imageURL,
                    brand: vehicule.brand,
                    category: vehicule.category.name, 
                    model: vehicule.model,
 
                    engineType: vehicule.engineType,
                    transmission: vehicule.transmission,
                    price: vehicule.price,
                    discountPercent: vehicule.discountPercent,
                    discountedPrice: vehicule.discountedPrice,

                    availability: vehicule.availability ? "Yes" : "No", 
 
                }));
                setVehicules(vehiculeData);
            })
            .catch(error => {
                console.error("Error fetching vehicules:", error);
            });
    }, []);

    return(
        <Fragment>
            <Box m="20px">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Header title="Vehicles" subtitle="View all vehicles" />
                    <Button variant="contained"
                        onClick={handleAllVehicule}

                        sx={{
                            backgroundColor:`${colors.thirdDegree}`,
                            color:`${colors.text}`,
                            "&:hover":{
                                backgroundColor:`${colors.text}`,
                                color:`${colors.fourthDegree}`,
                            }
                        }}
                    >
                        Add Vehicle
                    </Button>
                </Box>
            </Box>
            <div style={{ height: 500, width: '100%'}}>
                <DataGrid
                    rows={vehicules}
                    columns={columns}
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            height: 60, 
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            lineHeight: '1.2', 
                            whiteSpace: 'normal', 
                            overflow: 'visible', 
                            textOverflow: 'ellipsis', 
                        },
                    }}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                    }}
                    pageSizeOptions={[5, 7]}
                    
                />
            </div>
        </Fragment>
    )
}
export default Vehicule;