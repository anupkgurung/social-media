import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { _get, _post, _doPost, _delete } from "../../service";


export const getAllUser = createAsyncThunk(
    "user/getAllUser",
    async(_,{rejectWithValue})=>{
        const {data} = await _get("/api/users",rejectWithValue)
        return data
    }
)

export const getBookmarks = createAsyncThunk(
    "user/getBookmarks",
    async(_,{rejectWithValue})=>{
        const {data} = await _get("/api/users/bookmark/",rejectWithValue)
        return data
    }
)

export const addToBookmark = createAsyncThunk(
    "user/addToBookmark",
    async(postId,{rejectWithValue})=>{
        const {data : {bookmarks}} = await _doPost(`/api/users/bookmark/${postId}`,rejectWithValue)
        return bookmarks
    }
)

export const deleteBookmark = createAsyncThunk(
    "user/deleteBookmark",
    async(postId,{rejectWithValue})=>{
        const {data} = await _delete(`/api/users/remove-bookmark/${postId}`,rejectWithValue)
        return data
    }
)
const userSlice = createSlice({
    name : "user",
    initialState : {
        user : [],
        bookmarks :[],
        followers : 0,
        isLoading:false,
        error:null
    },
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(getAllUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getAllUser.fulfilled,(state,{payload})=>{
            state.isLoading = false
            state.user = payload?.users
        })
        .addCase(getAllUser.rejected,(state,{payload})=>{
            state.error = payload?.response?.data?.errors[0]
        })
        //get all bookmarks
        .addCase(getBookmarks.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getBookmarks.fulfilled,(state,{payload})=>{
            state.isLoading = false
            state.bookmarks = payload?.bookmarks
        })
        .addCase(getBookmarks.rejected,(state,{payload})=>{
            state.error = payload?.response?.data?.errors[0]
        })
        //add to bookmark
        .addCase(addToBookmark.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addToBookmark.fulfilled,(state,{payload})=>{
            state.isLoading = false
            state.bookmarks = payload
        })
        .addCase(addToBookmark.rejected,(state,{payload})=>{
            state.error = payload?.response?.data?.errors[0]
        })
        //delete bookmark
        .addCase(deleteBookmark.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteBookmark.fulfilled,(state,{payload})=>{
            state.isLoading = false
            state.bookmarks = payload?.bookmarks
        })
        .addCase(deleteBookmark.rejected,(state,{payload})=>{
            state.error = payload?.response?.data?.errors[0]
        })
    }
})

export const userReducer = userSlice.reducer
export const useUser = () => useSelector(state => state.user)