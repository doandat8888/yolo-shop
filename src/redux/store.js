import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import cartItemSlice from "./cart-item/cartItemSlice";
import userItemSlice from "./user/userItemSlice";
import productItemSlice from "./product/productItemSlice";

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
})

export const store =  configureStore({
    reducer: {
        cartItems: cartItemSlice,
        user: userItemSlice,
        products: productItemSlice
    },
    middleware: customizedMiddleware
})