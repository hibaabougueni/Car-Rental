import {Routes, Route} from 'react-router-dom';
import {ColorModeContext, useMode } from './../admin/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './../admin/component/Topbar';
import Sidebar2 from './../admin/component/Sidebar';
import Dashboard from './../admin/component/Dashboard';
import Customers from './../admin/component/Customers';
import Category from './../admin/component/Category';
import Orders from './../admin/component/Orders';
import Vehicule from './../admin/component/Vehicule';
import AddVehicule from './../admin/component/AddVehicule';
import AddCategory from './../admin/component/AddCategory';
import InfoVehicule from './../admin/component/InfoVehicule';
import EditVehicule from './../admin/component/EditVehicule';
import EditCategory from './../admin/component/EditCategory';
import InfoOrder from '../admin/component/InfoOrder';

import './../App.css'

const AdminRouter=()=>{
    const [theme, colorMode] = useMode();

    return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
          <div className="app">
            <Sidebar2 />
            <main className='contentAdmin'>
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/vehicule" element={<Vehicule />} />
                <Route path="/addvehicule" element={<AddVehicule />} />
                <Route path="/addCategory" element={<AddCategory />} />
                <Route path="/category" element={<Category />} />
                <Route path="/editCategory/id/:id" element={<EditCategory />} />
                <Route path="/order" element={<Orders />} />
                <Route path="/customer" element={<Customers />} />
                <Route path="/infoVehicule/id/:id" element={<InfoVehicule />} />
                <Route path="/editVehicule/id/:id" element={<EditVehicule />} />
                <Route path="/infoOrder/id/:id" element={<InfoOrder />} />
              </Routes>
            </main>
          </div>
        
      </ThemeProvider>
      
    </ColorModeContext.Provider>
    )
}

export default AdminRouter;