import axios from "axios";

const API_BASE_URL="http://localhost:8086/api/users";

class CustomerService{

    getAll(){
        return axios.get(`${API_BASE_URL}/all`);
    }
}

export default new CustomerService;