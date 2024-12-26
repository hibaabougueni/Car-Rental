import { Box, Button, Grid, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState, useEffect } from "react";
import CartService from "../../../services/CartService";
import CartItemService from "../../../services/CartItemService";
import { useNavigate } from "react-router-dom";
import UserService from "../../../services/UserService";

const Cart=({ visible, onClose })=>{

    const token=localStorage.getItem("token");
    const [user, setUser]= useState({});

    const navigate= useNavigate();

    const [cart, setCart]= useState({});
    const [cartItems, setCartItems] = useState([]);

    useEffect(()=>{
        if(token){
          UserService.getUser(token)
          .then(response => {
            setUser(response.data);
            console.log('User data:', response.data);
            return CartService.findCart(response.data.id)
        })
        .then(response => {
            console.log('Cart data:', response.data);
            setCart(response.data);
            setCartItems(response.data.cartItems);
            recalculateCartTotals(response.data.cartItems);
        })
        .catch(error => {
            
            console.error("Error fetching user data", error);
        });
        }
      
      },[token]);

    const handleAdd = async (itemId) => {
        const itemToUpdate = cartItems.find(item => item.id === itemId);
        if (itemToUpdate) {
            const newBabySeat = itemToUpdate.babySeat + 1;
            const updatedCartItems = await updateCartItem(itemId, newBabySeat);
            setCartItems(updatedCartItems);  // Update cart items with new state
        }

    };

    const handleRemove = async (itemId) => {
        const itemToUpdate = cartItems.find(item => item.id === itemId);
        if (itemToUpdate && itemToUpdate.babySeat > 0) {
            const newBabySeat = itemToUpdate.babySeat - 1;
            const updatedCartItems = await updateCartItem(itemId, newBabySeat);
            setCartItems(updatedCartItems);
        }
    };

    // const updateCartItem = async (itemId, newBabySeat) => {
    //     const itemToUpdate = cartItems.find(item => item.id === itemId);
    //     const updatedItem = {
    //         ...itemToUpdate,
    //         babySeat: newBabySeat,
    //     };
    //     try {
    //         await CartItemService.updateItem(itemId, user.id,updatedItem);
    //         const updatedCartItems = cartItems.map(item =>
    //             item.id === itemId ? updatedItem : item
    //         );
    //         setCartItems(updatedCartItems);
    //         recalculateCartTotals(updatedCartItems);
    //         } catch (error) {
    //         console.error('Error updating cart item:', error);
    //     }
    // };

    const updateCartItem = async (itemId, newBabySeat) => {
        const itemToUpdate = cartItems.find(item => item.id === itemId);
        const updatedItem = {
            ...itemToUpdate,
            babySeat: newBabySeat,
        };
    
        try {
            await CartItemService.updateItem(itemId, user.id, updatedItem); // Perform the update
            const updatedCart = await CartService.findCart(user.id);  // Fetch updated cart
            setCart(updatedCart.data); // Update cart state
            return updatedCart.data.cartItems; // Return updated items
        } catch (error) {
            console.error('Error updating cart item:', error);
            return cartItems; // Return current cartItems if error occurs
        }
    };

    const handleDelete=(id)=>{
        CartItemService.deleteById(id,user.id)
        .then(() => {
            setCartItems((prevItems) => {
                const updatedItems = prevItems.filter(item => item.id !== id);
                recalculateCartTotals(updatedItems);
                return updatedItems;
            });
            console.log("Item deleted");
        })
        .catch(error => {
            console.error("Error deleting item", error);
        });
    };

    const recalculateCartTotals = (updatedCartItems) => {
        const totalItems = updatedCartItems.length;
        const totalPrice = updatedCartItems.reduce((sum, item) => sum + item.itemPrice, 0);
        const totalDiscountedPrice = updatedCartItems.reduce((sum, item) => sum + item.itemDiscountedPrice, 0);

        setCart(prevCart => ({
            ...prevCart,
            totalItems,
            totalPrice,
            totalDiscountedPrice
        }));
    };

    const handleCheckout=()=>{
        navigate("/checkout");
        onClose();
    }
    


    return(
        <Box 
        sx={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "450px",
            height: "100%",
            backgroundColor: "white",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            display: visible ? "block" : "none",
            zIndex: 1000,
            padding: "20px",
            overflow: "auto",

        }}>
            <Grid container spacing={2}>
                
                <Grid item xs={12} sx={{display:"flex"}}>
                    <CloseIcon  onClick={onClose}
                        sx={{cursor:"pointer", color:"grey"}}
                    />
                    <Typography variant="h5" sx={{margin:"0 auto"}}>Cart</Typography>
                </Grid>
                {cartItems.map((item) => (
                <Grid container sx={{backgroundColor:"#f0eded", borderRadius:"5px", boxShadow:"2", margin:"10px"}}>
                <Grid item xs={4} sm={4} md={4} sx={{padding:"7px"}}>
                    <img src={item.vehicule.imageURL} alt="img" width="100%" height="120px"/>
                </Grid>
                <Grid item xs={8} sm={8} md={8}>
                    <Typography sx={{fontWeight:"600", fontFamily: "'Montserrat', arial", marginTop:"5px"}}> {item.vehicule.brand} {item.vehicule.model} {item.vehicule.year}, {item.vehicule.color} </Typography>
                    <div style={{display:"flex", marginTop:"5px"}}>
                        <Typography sx={{fontWeight:"550", fontFamily: "'Montserrat', arial"}}> Pickup date : </Typography>
                        <Typography>{item.pickupDate}</Typography>
                    </div>
                    <div style={{display:"flex", marginTop:"5px"}}>
                        <Typography sx={{fontWeight:"550", fontFamily: "'Montserrat', arial"}}> Return date : </Typography>
                        <Typography>{item.returnDate}</Typography>
                    </div>
                    <div style={{display:"flex", marginTop:"5px"}}>
                        <Typography sx={{fontWeight:"550", fontFamily: "'Montserrat', arial"}}> Duration : </Typography>
                        <Typography>{item.duration} Days</Typography>
                    </div>
                     
                    <div style={{display:"flex", marginTop:"5px", justifyContent:"space-between"}}>
                        <Typography sx={{fontWeight:"550", fontFamily: "'Montserrat', arial"}}>Baby's seat: </Typography>
                        <RemoveIcon onClick={() => handleRemove(item.id)} sx={{color:"red", cursor:"pointer"}} />
                        <Typography sx={{backgroundColor:"white", borderRadius:"3px", padding:"0px 25px"}}>{item.babySeat}</Typography>
                        <AddIcon onClick={() => handleAdd(item.id)} sx={{color:"green", marginRight:"20px", cursor:"pointer"}}/>
                    </div>
                    
                    <div style={{display:"flex", marginTop:"7px"}}>
                        <Typography sx={{marginRight:"5px", fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>{item.itemDiscountedPrice} DH</Typography>
                        <Typography sx={{marginRight:"5px", color:"#c0bfbf" ,fontWeight:"600",textDecorationLine:"line-through", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>{item.itemPrice} DH</Typography>
                        <Typography sx={{color:"#01b759", fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>{((item.itemPrice - item.itemDiscountedPrice) / item.itemPrice * 100).toFixed(2)}% off</Typography>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <DeleteIcon onClick={()=>handleDelete(item.id)}
                    sx={{color:"red", marginLeft:"380px", cursor:"pointer"}}/>
                </Grid>
                </Grid>
                ))}

                <Grid item xs={12} style={{display:"flex", flexDirection: "column", justifyContent: "end", minHeight:"50vh", padding: "20px"}}>
                    <div style={{display:"flex"}}>
                        <Typography  sx={{fontSize:"17px",fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>Total items:  </Typography>
                        <Typography sx={{margin:"0px 10px", fontSize:"18px"}}>{cart.totalItems} </Typography>
                    </div>
                    <div style={{display:"flex"}}>
                        <Typography variant="h6" sx={{fontSize:"17px",fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>Total price:  </Typography>
                        <Typography sx={{margin:"0px 10px", fontSize:"18px"}}>{cart.totalPrice} </Typography>
                    </div>
                    <div style={{display:"flex"}}>
                        <Typography variant="h6" sx={{fontSize:"17px",fontWeight:"600", fontFamily: "'Montserrat', arial", letterSpacing: "1px"}}>Total discounted price:  </Typography>
                        <Typography sx={{margin:"0px 10px", fontSize:"18px"}}>{cart.totalDiscountedPrice} </Typography>
                    </div>
                    
                    <div style={{display:"flex", justifyContent:"flex-end", marginTop:"15px"}}>
                        <Button variant="contained" 
                             sx={{
                                backgroundColor:"#51C44A",
                                
                                "&:hover":{
                                    backgroundColor:"#103b0e",
                                    color:"#fdf9f3"
                                }
                            }}
                        onClick={handleCheckout}>Checkout</Button>
                    </div>
                </Grid>
                
            </Grid>

        </Box>
    );

}

export default Cart;