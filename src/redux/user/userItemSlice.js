import { createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userService";

const userInfo = localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')) : {}
const initialState = {
    userInfo: userInfo
}

const userItemSlice = createSlice({
    name: 'user_info',
    initialState,
    reducers: {
        userLoginSuccess: (state, action) => {
            let {userInfo} = action.payload;
            if(userInfo) {
                state.userInfo = userInfo;
            }
            localStorage.setItem('user_info', JSON.stringify(state.userInfo));
        },
        
    }
    
})

const {actions, reducer} = userItemSlice;
export const {userLoginSuccess} = actions;
export default reducer
