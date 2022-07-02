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
    async(userCredential,{rejectWithValue})=>{
        try {
            const {data} = await _post("/api/auth/login",userCredential,rejectWithValue)    
            return data;
        } catch (error) {
            if(error.response.status == 404){
                return rejectWithValue(error.response.data.errors[0])
            }
            else{
                return rejectWithValue("Check username password")
            }
        }
    }
)

export const userSignup = createAsyncThunk(
    "auth/signup",
     async(userCredential,{rejectWithValue})=>{
        try {
            const {data} = await _post("/api/auth/signup",userCredential,rejectWithValue)  
            return data  
        } catch (error) {
            if(error.response.status == 422){
                return rejectWithValue(error.response.data.errors[0])
            }
            else{
                return rejectWithValue("Error occured on registering, please try again later")
            }
        } 
        
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
            .addCase(userSignup.pending,(state)=> {
                state.isLoading = true
            })
            .addCase(userSignup.fulfilled,(state,{payload})=> {
                state.isLoading = false
                state.isLogin =true
                state.userInfo = payload?.createdUser
                localStorage.setItem("login-token",payload?.encodedToken)
                localStorage.setItem("loggedUser",payload?.createdUser)
            })
            .addCase(userSignup.rejected,(state)=> {
                state.isLoading = false
                state.isLogin =false
                state.userInfo = {}
            })
            .addCase(userLogin.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(userLogin.fulfilled,(state,{payload})=>{
                state.isLoading = false
                state.isLogin =true
                state.userInfo = payload?.foundUser
                localStorage.setItem("login-token",payload?.encodedToken)
                localStorage.setItem("loggedUser",payload?.foundUser)
            })
            .addCase(userLogin.rejected,(state)=>{
                state.isLoading = false
                state.isLogin =false
                state.userInfo = {}
            })
    }

})

export const authReducer = authSlice.reducer;
export const {logoutUser} = authSlice.actions;
export const useAuth =()=> useSelector((state) => state.auth)