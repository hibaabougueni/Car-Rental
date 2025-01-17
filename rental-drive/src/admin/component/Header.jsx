import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header=({title, subtitle})=>{
    const theme=useTheme();
    const colors= tokens(theme.palette.mode);
    return(
        <Box>
            <Typography 
            variant="h5" 
            fontWeight="bold" 
            sx={{mb:"5px"}}>
                {title}
            </Typography>
            <Typography variant="subtitle1">{subtitle}</Typography>
        </Box>
    )
}

export default Header;