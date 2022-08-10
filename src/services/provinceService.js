import axios from "axios";

const getAllProvince = () => {
    return axios.get('https://provinces.open-api.vn/api/?depth=3');
}


export default {
    getAllProvince
}