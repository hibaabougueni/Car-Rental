import axios from "axios"
const API_BASE_URL="http://localhost:8086/api/category";

class CategoryService{

    addCat(category){
        return axios.post(`${API_BASE_URL}/add`, category);
    }

    updateCat(id, category){
        return axios.put(`${API_BASE_URL}/update/id/${id}`, category);
    }

    findCatById(id){
        return axios.get(`${API_BASE_URL}/id/${id}`);
    }

    findAll(){
        return axios.get(`${API_BASE_URL}/all`);
    }

    deleteCat(id){
        return axios.delete(`${API_BASE_URL}/delete/id/${id}`);
    }
}
export default new CategoryService;