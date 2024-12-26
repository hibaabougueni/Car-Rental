import {Routes, Route} from 'react-router-dom';
import Navigationbar from '../User/component/Navigationbar';
import Aboutus1 from '../User/component/Aboutus1';
import Footer from '../User/component/Footer'
import ProductCard from '../User/component/product/ProductCard';
import Contactus from '../User/component/Contactus';
import Home from '../User/component/Home';
import Condition from '../User/component/Condition';
import VehiculeDetails from '../User/component/product/VehiculeDetails';
import Cart from '../User/component/cart/Cart';
import Checkout from '../User/component/cart/Checkout';
import OrderHistory from '../User/component/order/OrderHistory';
import OrderDetails from '../User/component/order/OrderDetails';
import AllVehicules from '../User/component/product/AllVehicules';

import { useState } from 'react';
import AvailableVehicules from '../User/component/product/AvailableVehicules';
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId="595746754776-t10gmkvsaldgap227640jm81ku6mr5bv.apps.googleusercontent.com";

const UserRouter=()=>{

    const [isCartVisible, setIsCartVisible] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const handleCartToggle = () => {
        setIsCartVisible(prev => !prev);
    }
    
    const handleOpenCart=()=>{
        setIsCartVisible(true);
    }

    const addToCart = (item) => {
        setCartItems(prevItems => [...prevItems, item]);
        handleOpenCart(); 
    }

    return(
        <div >
            <GoogleOAuthProvider clientId={clientId}>
                <Navigationbar onCartClick={handleCartToggle} />
                <main>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path="/contactus" element={<Contactus />} />
                        <Route path="/aboutus" element={<Aboutus1 />} />
                        <Route path="/conditions" element={<Condition />} />
                        <Route path="/vehicules/:category" element={<ProductCard />} />
                        <Route path="/vehicules" element={<AllVehicules />} />
                        <Route path="/details/:id" element={<VehiculeDetails addToCart={addToCart}/>} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/history" element={<OrderHistory />} />
                        <Route path="/orderDetails/:id" element={<OrderDetails />} />
                        <Route path="/available/:pickupDate/:returnDate" element={<AvailableVehicules />} />
                    </Routes>
                </main>
                <Cart visible={isCartVisible} onClose={handleCartToggle} />
                <Footer />
            </GoogleOAuthProvider>

        </div> 
    );
}

export default UserRouter;