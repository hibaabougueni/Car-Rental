import axios from "axios";
const API_BASE_URL= "http://localhost:8086/api/review";

class ReviewService{

    findAllReviews(id){
       return axios.get(`${API_BASE_URL}/id/${id}`);
    }

    addReview(id, review){
        return axios.post(`${API_BASE_URL}/add/id/${id}`, review);
    }
}

export default new ReviewService;

