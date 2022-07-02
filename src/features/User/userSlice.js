import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { _get, _post, _doPost, _delete } from "../../service";


export const getAllUser = createAsyncThunk(
    "user/getAllUser",
    async(_,{rejectWithValue})=>{
        try {
            const {data} = await _get("/api/users",rejectWithValue)
            return data
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const getUser = createAsyncThunk(
    "user/getUser",
    async(userId,{rejectWithValue})=>{
        try {
            const {data : {user}} = await _get(`/api/users/${userId}`,rejectWithValue)
            return user
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const editUser = createAsyncThunk(
    "user/editUser",
    async(userData,{rejectWithValue})=>{
        try {
            const {data :{user}} = await _post("/api/users/edit",{userData},rejectWithValue)
            return user
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const getBookmarks = createAsyncThunk(
    "user/getBookmarks",
    async(_,{rejectWithValue})=>{
        try {
            const {data} = await _get("/api/users/bookmark/",rejectWithValue)
            return data
        } catch (error) {
            rejectWithValue(error)
        }
       
    }
)

export const addToBookmark = createAsyncThunk(
    "user/addToBookmark",
    async(postId,{rejectWithValue})=>{
        try {
            const {data : {bookmarks}} = await _doPost(`/api/users/bookmark/${postId}`,rejectWithValue)
            return bookmarks
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const deleteBookmark = createAsyncThunk(
    "user/deleteBookmark",
    async(postId,{rejectWithValue})=>{
        try {
            const {data} = await _delete(`/api/users/remove-bookmark/${postId}`,rejectWithValue)
            return data
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const followUser = createAsyncThunk(
    "user/followUser",
    async(followUserId,{rejectWithValue})=>{
        try {
            const {data : {user}} = await _doPost(`/api/users/follow/${followUserId}`)
            return user
        } catch (error) {
            rejectWithValue(error)
        }
    }
)
export const unFollowUser = createAsyncThunk(
    "user/unFollowUser",
    async(followUserId,{rejectWithValue})=>{
        try {
            const {data : {user}} = await _doPost(`/api/users/unfollow/${followUserId}`)
            return user
        } catch (error) {
            rejectWithValue(error)
        }
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
        isEditProfile : false,
        newProfileImg : null
    },
    reducers : {
        setEditProfile : (state)=> {
            state.isEditProfile = !state.isEditProfile
        },
        setProfileImge : (state,{payload})=>{
            state.newProfileImg = payload
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
            state.userList = []
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
            state.bookmarks = []
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
            state.user = {}
        })
        .addCase(unFollowUser.fulfilled,(state,{payload})=>{
            state.isLoading = false
            state.user = payload
        })
        .addCase(unFollowUser.rejected,(state,{payload})=>{
            state.user = []
        })
    }
})

export const userReducer = userSlice.reducer
export const useUser = () => useSelector(state => state.user)
export const {setEditProfile, setProfileImge} = userSlice.actions