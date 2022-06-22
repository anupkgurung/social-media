import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/Authentication/authSlice";

export const store = configureStore({
    reducer : {
        auth : authReducer
    }
})