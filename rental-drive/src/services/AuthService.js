import axios from "axios";
const API_BASE_URL="http://localhost:8086/api/auth";

class AuthService{

    login(user){
        return axios.post(`${API_BASE_URL}/login`, user);
    };

    register(user){
        return axios.post(`${API_BASE_URL}/register`, user)
    };

}

export default new AuthService;