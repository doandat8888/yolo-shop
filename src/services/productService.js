import axios from "../axios"

const addNewProduct = (data) => {
    return axios.post('/api/add-new-product', data);
}

const editProduct = (data) => {
    return axios.post('/api/edit-product', data);
}

const deleteProduct = (slug) => {
    return axios.delete('/api/delete-product', {
        data: {
            slug: slug,
        }
    });
}

const getAllProduct = () => {
    return axios.get('/api/get-all-product');
}

const getProductBySlug = (slug) => {
    return axios.get(`/api/get-product-by-slug?slug=${slug}`)
}

export default {
    addNewProduct,
    getAllProduct,
    editProduct,
    deleteProduct,
    getProductBySlug
}