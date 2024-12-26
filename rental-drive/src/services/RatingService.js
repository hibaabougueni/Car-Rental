import axios from "axios";
const API_BASE_URL= "http://localhost:8086/api/rating";

class RatingService{

    findAllratings(id){
        return axios.get(`${API_BASE_URL}/id/${id}`);
    }
}

export default new RatingService;