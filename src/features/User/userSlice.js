import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { _get, _post, _doPost, _delete } from "../../service";


export const getAllUser = createAsyncThunk(
    "user/getAllUser",
    (_,{rejectWithValue})=>{
        return _get("/api/users",rejectWithValue)
    }
)

export const getBookmarks = createAsyncThunk(
    "user/getBookmarks",
    (_,{rejectWithValue})=>{
        return _get("/api/users/bookmark/",rejectWithValue)
    }
)

export const addToBookmark = createAsyncThunk(
    "user/addToBookmark",
    (postId,{rejectWithValue})=>{
        return _doPost(`/api/users/bookmark/${postId}`,rejectWithValue)
    }
)

export const deleteBookmark = createAsyncThunk(
    "user/deleteBookmark",
    (postId,{rejectWithValue})=>{
        return _delete(`/api/users/remove-bookmark/${postId}`,rejectWithValue)
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
            state.user = payload?.data.users
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
            state.bookmarks = payload?.data?.booksmarks
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
            state.bookmarks = payload?.data?.bookmarks
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
            state.bookmarks = payload?.data?.bookmarks
        })
        .addCase(deleteBookmark.rejected,(state,{payload})=>{
            state.error = payload?.response?.data?.errors[0]
        })
    }
})

export const userReducer = userSlice.reducer
export const useUser = () => useSelector(state => state.user)