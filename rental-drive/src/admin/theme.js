import {createContext, useState, useMemo} from 'react';
import { createTheme } from "@mui/material/styles";

export const tokens=(mode) =>({
    ...(mode === "dark" 
        ?{
            firstDegree: "#070F2B",
            secondDegree: "#1B1A55",
            thirdDegree: "#535C91",
            fourthDegree: "#9290C3",
            text:"white",
           
        }
        :{
            firstDegree: "#161A30",
            secondDegree: "#31304D",
            thirdDegree: "#DDDDDD",
            fourthDegree: "#F0ECE5",
            text:"#161A30",
        }
    )
});

export const themeSettings=(mode)=>{
    const colors=tokens(mode);

    return {
        palette: {
            mode: mode,
            ...(mode === 'dark'
                ?{
                    primary:{
                        main: colors.firstDegree,
                    },
                    secondary:{
                        main: colors.secondDegree,
                    },
                    third:{
                        main: colors.thirdDegree,
                    },
                    fourth:{
                        main: colors.fourthDegree,
                    },
                    background: {
                        default: colors.firstDegree,
                    }
                }
                :{
                    primary:{
                        main: colors.firstDegree,
                    },
                    secondary:{
                        main: colors.secondDegree,
                    },
                    third:{
                        main: colors.thirdDegree,
                    },
                    fourth:{
                        main: colors.fourthDegree,
                    },
                    background:{
                        default: "#f5f5f5",
                    }
                }
            )
        },

    };

};

export const ColorModeContext = createContext({
    toggleColorMode : () =>{}
});

export const useMode = () =>{
    const [mode, setMode]= useState("light");
    const colorMode = useMemo(
        ()=>({
            toggleColorMode : () =>
                setMode((prev) => (prev ==="dark" ? "light" : "dark")),
        }),
        []
    );

    const theme = useMemo(()=> createTheme(themeSettings(mode)), [mode]);
    return [theme, colorMode];
}
