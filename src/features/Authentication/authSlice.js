import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import {_post} from "../../service";

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
    reducers :{
        logoutUser : (state)=>{
            state.isLogin =false
        } 
    },
    extraReducers : (builder)=>{
        builder
            .addCase(userSignup.pending,(state,{payload})=> {
                state.isLoading = true
            })
            .addCase(userSignup.fulfilled,(state,{payload : {data}})=> {
                state.isLoading = false
                state.isLogin =true
                state.userInfo = data?.createdUser
                localStorage.setItem("login-token",data?.encodedToken)
                localStorage.setItem("loggedUser",data?.createdUser)
            })
            .addCase(userSignup.rejected,(state,{payload})=> {
                state.isLoading = false
                state.isLogin =false
         
                state.error = payload.response?.data?.errors[0]
            })
            .addCase(userLogin.pending,(state,{payload})=>{
                state.isLoading = true
            })
            .addCase(userLogin.fulfilled,(state,{payload : {data}})=>{
                state.isLoading = false
                state.isLogin =true
                state.userInfo = data?.foundUser
                localStorage.setItem("login-token",data?.encodedToken)
                localStorage.setItem("loggedUser",data?.foundUser)
            })
            .addCase(userLogin.rejected,(state,{payload})=>{
                state.isLoading = false
                state.isLogin =false
                state.error = payload.response?.data?.errors[0]
            })
    }

})

export const authReducer = authSlice.reducer;
export const {logoutUser} = authSlice.actions;
export const useAuth =()=> useSelector((state) => state.auth)