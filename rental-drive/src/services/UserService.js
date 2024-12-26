import axios from "axios";
const API_BASE_URL="http://localhost:8086/api/users";
class UserService{

    getUser(token){
        return axios.get(`${API_BASE_URL}/profile`, {
            headers: {
                Authorization: `${token}`
            }
        }).catch(error => {
            console.error("Error fetching user data", error.response || error.message);
            throw error; 
        });
    }
}

export default new UserService;