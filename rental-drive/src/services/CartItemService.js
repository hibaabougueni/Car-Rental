import axios from "axios";
const API_BASE_URL="http://localhost:8086/api/cartItem";

class CartItemService{

    addCartItem(cartItem){
        return axios.post(`${API_BASE_URL}/add`, cartItem);
    }

    getItemById(id){
        return axios.get(`${API_BASE_URL}/id/${id}`);
    }

    deleteById(id, idUser){
        return axios.delete(`${API_BASE_URL}/delete/${idUser}/${id}`);
    }

    deleteAll(iduser){
        return axios.delete(`${API_BASE_URL}/delete/${iduser}`);
    }

    updateItem(id, iduser,cartItem){
        return axios.put(`${API_BASE_URL}/update/${id}/${iduser}`, cartItem);
    }

    updateCartItem(id, cartItem){
        return axios.put(`${API_BASE_URL}/update/id/${id}`, cartItem);
    }
}

export default new CartItemService;