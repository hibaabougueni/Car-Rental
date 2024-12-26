import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../theme';
import {useTheme} from "@mui/material";


const Topbar=()=>{
    const theme= useTheme();
    const colors= tokens(theme.palette.mode);
    const colorMode= useContext(ColorModeContext);

    return(
      
            
            <Box display="flex" justifyContent="flex-end" alignItems="center" width="97%" margin="10px" >
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode==='light' ? (
                        <DarkModeOutlinedIcon /> 
                    )   : (<LightModeOutlinedIcon />
                        )
                     }
                    
                </IconButton>
                <IconButton>
                    <AccountCircleOutlinedIcon />
                </IconButton>
            </Box>
    
    )

}

export default Topbar;