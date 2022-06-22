import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {_get, _post} from "../../service";

const initialState = {
    userInfo : {},
    error:{},
    isLoading:false,
    isLogin:false
}

export const userLogin = createAsyncThunk(
    "auth/login",
    (userCredential,{rejectWithValue})=>{
        return _post("/api/auth/login",userCredential,rejectWithValue)    
    }
)

export const userSignup = createAsyncThunk(
    "auth/signup",
     (userCredential,{rejectWithValue})=>{
        return _post("/api/auth/signup",userCredential,rejectWithValue)    
    }
)

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers :{},
    extraReducers : (builder)=>{
        builder
            .addCase(userSignup.pending,(state,{payload})=> {
                state.isLoading = true
            })
            .addCase(userSignup.fulfilled,(state,{payload})=> {
                state.isLoading = false
                state.isLogin =true
            })
            .addCase(userSignup.rejected,(state,{payload})=> {
                state.isLoading = false
                state.isLogin =false
                state.error = payload.response?.data?.errors[0]
            })
    }

})

export const authReducer = authSlice.reducer;
export const {loggedInUser} = authSlice.actions;
export const useAuth =()=> useSelector((state) => state.auth)