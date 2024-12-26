import axios from 'axios';
import dayjs from 'dayjs';

const API_BASE_URL= "http://localhost:8086/api/vehicules";

class VehiculeService{
    addVehicule(vehicule){
        return axios.post(`${API_BASE_URL}/admin/add`, vehicule);
    }

    deleteVehicule(id){
        return axios.delete(`${API_BASE_URL}/admin/${id}/delete`);
    }

    findAllVehicules(){
        return axios.get(`${API_BASE_URL}/admin`);
    }

    updateVehicule(id, vehicule){
        return axios.put(`${API_BASE_URL}/admin/${id}/update`, vehicule);
    }

    findVehiculeById(id){
        return axios.get(`${API_BASE_URL}/id/${id}`);
    }

    findVehiculeByCat(category){
        return axios.get(`${API_BASE_URL}/category/${category}`);
    };

    findVehiculeByDate(pickupd, returnd){
        return axios.get(`${API_BASE_URL}/available`, {
            params: {
                pickupDate: dayjs(pickupd).format(),
                returnDate: dayjs(returnd).format()
            }
        });
    };
}

export default new VehiculeService;