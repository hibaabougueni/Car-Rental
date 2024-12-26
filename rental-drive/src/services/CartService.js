import axios from "axios";
const API_BASE_URL="http://localhost:8086/api/cart";

class CartService{

    addItemToCart(cartItem, id){
        return axios.put(`${API_BASE_URL}/add/id/${id}`, cartItem);
    };

    findCart(id){
        return axios.get(`${API_BASE_URL}/id/${id}`);
    };

    addItem(cartItem, token){
        return axios.put(`${API_BASE_URL}/addItem`, cartItem,{
            headers:{Authorization: `Bearer ${token}`}
        });
    };

    findUserCart(token){
        return axios.get(`${API_BASE_URL}`,{
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type":"application/json"
            }
        });
    }


}

export default new CartService;