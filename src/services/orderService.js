import axios from '../axios';

const addNewOrder = (data) => {
    return axios.post('/api/add-new-order', data)
}

const getAllOrder = () => {
    return axios.get('/api/get-all-order')
}

const getOrderByPhoneNumber = (phoneNumber) => {
    return axios.get(`/api/get-order-by-phone?phoneNumber=${phoneNumber}`)
}

const sendOrderInfo = (email, dataBills, dataDetailBills) => {
    return axios.post('/api/send-order-info', {
        email: email,
        dataBills: dataBills,
        dataDetailBills: dataDetailBills
    })
}

export default {
    addNewOrder,
    getOrderByPhoneNumber,
    getAllOrder,
    sendOrderInfo,
}