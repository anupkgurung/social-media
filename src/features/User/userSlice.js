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

export const getUser = createAsyncThunk(
    "user/getUser",
    async(userId,{rejectWithValue})=>{
        const {data : {user}} = await _get(`/api/users/${userId}`,rejectWithValue)
        return user
    }
)

export const editUser = createAsyncThunk(
    "user/editUser",
    async(userData,{rejectWithValue})=>{
        const {data :{user}} = await _post("/api/users/edit",{userData},rejectWithValue)
        return user
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

export const followUser = createAsyncThunk(
    "user/followUser",
    async(followUserId,{rejectWithValue})=>{
        const {data : {user}} = await _doPost(`/api/users/follow/${followUserId}`)
        return user
    }
)
export const unFollowUser = createAsyncThunk(
    "user/unFollowUser",
    async(followUserId,{rejectWithValue})=>{
        const {data : {user}} = await _doPost(`/api/users/unfollow/${followUserId}`)
        return user
    }
)

const userSlice = createSlice({
    name : "user",
    initialState : {
        user : {},
        userList :[],
        bookmarks :[],
        followers : 0,
        isLoading:false,
        error:null,
        isEditProfile : false
    },
    reducers : {
        setEditProfile : (state)=> {
            state.isEditProfile = !state.isEditProfile
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(getAllUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getAllUser.fulfilled,(state,{payload})=>{
            state.isLoading = false
            state.userList = payload?.users
        })
        .addCase(getAllUser.rejected,(state,{payload})=>{
            state.error = payload?.response?.data?.errors[0]
        })
        .addCase(getUser.fulfilled,(state,{payload})=>{
            state.isLoading = false
            state.user = payload
        })
        .addCase(getUser.rejected,(state,{payload})=>{
            state.error = payload?.response?.data?.errors[0]
        })
        .addCase(editUser.fulfilled,(state,{payload})=>{
            state.isLoading = false
            state.user = payload
        })
        .addCase(editUser.rejected,(state,{payload})=>{
            state.error = payload?.response?.data?.errors[0]
        })
        //get all bookmarks
        .addCase(getBookmarks.fulfilled,(state,{payload})=>{
            state.isLoading = false
            state.bookmarks = payload?.bookmarks
        })
        .addCase(getBookmarks.rejected,(state,{payload})=>{
            state.error = payload?.response?.data?.errors[0]
        })
        //add to bookmark
        .addCase(addToBookmark.fulfilled,(state,{payload})=>{
            state.isLoading = false
            state.bookmarks = payload
        })
        .addCase(addToBookmark.rejected,(state,{payload})=>{
            state.error = payload?.response?.data?.errors[0]
        })
        //delete bookmark
        .addCase(deleteBookmark.fulfilled,(state,{payload})=>{
            state.isLoading = false
            state.bookmarks = payload?.bookmarks
        })
        .addCase(deleteBookmark.rejected,(state,{payload})=>{
            state.error = payload?.response?.data?.errors[0]
        })
        //follow user
        .addCase(followUser.fulfilled,(state,{payload})=>{
            state.isLoading = false
            state.user = payload
        })
        .addCase(followUser.rejected,(state,{payload})=>{
            state.error = payload?.response?.data?.errors[0]
        })
        .addCase(unFollowUser.fulfilled,(state,{payload})=>{
            state.isLoading = false
            state.user = payload
        })
        .addCase(unFollowUser.rejected,(state,{payload})=>{
            state.error = payload?.response?.data?.errors[0]
        })
    }
})

export const userReducer = userSlice.reducer
export const useUser = () => useSelector(state => state.user)
export const {setEditProfile} = userSlice.actions