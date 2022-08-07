import { createSlice } from "@reduxjs/toolkit";
import productService from "../../services/productService";

const items = localStorage.getItem('product-items') ? JSON.parse(localStorage.getItem('product-items')) : []

const initialState = {
    value: items
}



const productItemSlice = createSlice({
    name: 'product-items',
    initialState,
    reducers: {
        getAllProduct: (state, action) => {
            let {data} = action.payload;
            if(data) {
                state.value = data;
            }
            localStorage.setItem('product-items', JSON.stringify(state.value));
        },
        addNewProduct: (state, action) => {
            let {data} = action.payload;
            if(data) {
                state.value = [
                    ...state.value,
                    {
                        ...action.payload,
                        id: state.value.length > 0 ? state.value[state.value.length - 1].id + 1 : 1
                    }
                ]
            }
            localStorage.setItem('product-items', JSON.stringify(state.value));
        } 

    }
})



const {actions, reducer} = productItemSlice
export const {getAllProduct, addNewProduct} = actions;
export default reducer