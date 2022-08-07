import axios from '../axios';

const handleLogin = (username, password) => {
    return axios.post('/api/check-login', { username, password })
}

export default {
    handleLogin
}