import { createSlice } from "@reduxjs/toolkit";

const items = localStorage.getItem('cart-items') ? JSON.parse(localStorage.getItem('cart-items')) : []

const initialState = {
    value: items
}


const findIndex = (carts, id) => {
    var result = -1;
    carts.forEach((cart, index) => {
        if(cart.id === id) {
            result = index;
        }
    });
    return result;
};



const cartItemSlice = createSlice({
    name: 'cart-items',
    initialState,
    reducers: {
        addItems: (state, action) => {
            const productDuplicate = findItem(state.value, action.payload); //Tìm ra thằng bị trùng khi thêm
            if(productDuplicate.length > 0) { //Nếu có thằng bị trùng
                state.value = delItem(state.value, action.payload) //Set lại cái state là nhũng thằng không bị trùng
                state.value = [
                    ...state.value,
                    {
                        ...action.payload, //Lấy cái state chứa những thằng không trùng thêm vào thằng bị trùng
                        id: productDuplicate[0].id,
                        quantity: productDuplicate[0].quantity + action.payload.quantity
                    }
                ]
            }else {
                state.value = [
                    ...state.value,
                    {
                        ...action.payload,
                        id: state.value.length > 0 ? state.value[state.value.length - 1].id + 1 : 1
                    }
                ]
            }
            localStorage.setItem('cart-items', JSON.stringify(state.value.sort((a, b) => a.id > b.id ? 1 : (a.id < b.id) ? -1 : 0 )))
        },
        updateItems: (state, action) => {
            const productToUpdate = findItem(state.value, action.payload); 
            if(productToUpdate.length > 0) {
                const index = findIndex(state.value, productToUpdate[0].id);
                if(index >= 0) {
                    state.value[index].quantity = action.payload.quantity;
                }

                state.value = [
                    ...state.value,
                ]

            }
            localStorage.setItem('cart-items', JSON.stringify(state.value.sort((a, b) => a.id > b.id ? 1 : (a.id < b.id) ? -1 : 0 )))
        },
        removeItem: (state, action) => {
            const productToDelete = findItem(state.value, action.payload); 
            if(productToDelete.length > 0) {
                state.value = delItem(state.value, action.payload);
            }
            localStorage.setItem('cart-items', JSON.stringify(state.value.sort((a, b) => a.id > b.id ? 1 : (a.id < b.id) ? -1 : 0 )))
        }
    }
})

const findItem = (carts, item) => carts.filter(cart => cart.slug === item.slug && cart.color === item.color && cart.size === item.size) //Hàm này để tìm thằng bị trùng
const delItem = (arr, item) => arr.filter((e) => e.slug !== item.slug || e.color !== item.color || e.size !== item.size)  //Hàm này để tìm những thằng còn lại mà khác với thằng bị trùng


const {actions, reducer} = cartItemSlice
export const {addItems, updateItems, removeItem} = actions;
export default reducer