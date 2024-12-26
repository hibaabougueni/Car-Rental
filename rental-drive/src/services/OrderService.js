import axios from "axios";

const API_BASE_URL="http://localhost:8086/api/order";

class OrderService{
    getAllOrders=()=>{
        return axios.get(`${API_BASE_URL}/admin/all`);
    };

    confirmOrder=(id)=>{
        return axios.put(`${API_BASE_URL}/admin/confirm/${id}`);
    };

    cancelOrder=(id)=>{
        return axios.put(`${API_BASE_URL}/admin/cancel/${id}`);
    };

    deleteOrder=(id)=>{
        return axios.delete(`${API_BASE_URL}/admin/delete/${id}`);
    };


    //user

    userHistory(id){
        return axios.get(`${API_BASE_URL}/userHistory/id/${id}`);
    }

    createOrder(token){
        return axios.post(`${API_BASE_URL}/add`, {
            headers: {
                Authorization: `${token}`
            }
        })
    };
    addOrder(id, customer){
        return axios.post(`${API_BASE_URL}/add/id/${id}`, customer);
    };

    findOrderById(id){
        return axios.get(`${API_BASE_URL}/${id}`);
    };

    findOrderByVehicule(id){
        return axios.get(`${API_BASE_URL}/all/vehicule/${id}`);
    }



}
export default new OrderService;
