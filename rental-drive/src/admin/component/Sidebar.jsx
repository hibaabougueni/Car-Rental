import { useState } from "react";
import {ProSidebar, Menu, MenuItem} from "react-pro-sidebar";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

const Item=({title, to, icon, selected, setSelected})=>{
    const theme=useTheme();
    const colors= tokens(theme.palette.mode);
    return(
        <MenuItem active={selected === title} 
                onClick={()=> setSelected(title)}
                icon={icon}
                style={{color: colors.text}}
        >
            <Typography> {title}</Typography>
            <Link to={to} />
        </MenuItem>
    )
}

const Sidebar2=()=>{

    const theme= useTheme();
    const colors= tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed]= useState(false);
    const [selected, setSelected] = useState("Dashboard");
    
    return(
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.thirdDegree} !important`,
                
                },
                "& .pro-icon-wrapper": {
                    background: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 25px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: `${colors.firstDegree} !important`,
                },
                "& .pro-menu-item.active": {
                    color: `${colors.secondDegree} !important`,
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconshape="square">
                    <MenuItem
                        onClick={()=>setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                        }}
                    >
                    {!isCollapsed && (
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            ml="10px"
                        >
                            <Typography variant="h5" color={colors.text}>
                                RENT DRIVE
                            </Typography>
                            <IconButton onClick={()=> setIsCollapsed(!isCollapsed)}>
                                <MenuOutlinedIcon />
                            </IconButton>
                        </Box>
                    )
                    }
                    </MenuItem>
                    {!isCollapsed && (
                        <Box mb="25px" display="flex" justifyContent="center" alignItems="center">
                            <img 
                                alt="logo"
                                width="160px"
                                height="100px"
                                src="src\assets\newlogo3.png"
                                style={{cursor: "pointer"}}
                            />
                        </Box>
                    )}
                    <Box paddingLeft={isCollapsed? undefined: "5%"}>
                        <Item 
                            title="Dashboard"
                            to="/admin"
                            icon={<BarChartOutlinedIcon />}
                            setSelected={setSelected}
                    
                        />
                        <Item 
                            title="Vehicles"
                            to="/admin/vehicule"
                            icon={<DirectionsCarOutlinedIcon />}
                            setSelected={setSelected}
                        />
                        <Item 
                            title="Customers"
                            to="/admin/customer"
                            icon={<GroupOutlinedIcon />}
                            setSelected={setSelected}
                        />
                        <Item 
                            title="Orders"
                            to="/admin/order"
                            icon={<ReceiptLongOutlinedIcon />}
                            setSelected={setSelected}
                        />
                        <Item 
                            title="Categories"
                            to="/admin/category"
                            icon={<QuizOutlinedIcon />}
                            setSelected={setSelected}
                        />
                    </Box>

                </Menu>
            </ProSidebar>    
        </Box>
    )
}

export default Sidebar2;