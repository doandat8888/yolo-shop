import axios from '../axios';

const addNewDetailOrder = (data) => {
    return axios.post('/api/add-new-detail-order', data);
}

const getAllDetailOrder = () => {
    return axios.get('/api/get-all-detail-order');
}

export default {
    addNewDetailOrder,
    getAllDetailOrder
}