import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { _get, _post, _doPost, _delete } from "../../service";

export const getAllPosts = createAsyncThunk(
    "posts/getAllPosts",
    (_,{rejectWithValue})=>{
        return _get("/api/posts",rejectWithValue)
    }
)

export const getPost = createAsyncThunk(
    "posts/getPost",
    (postId,{rejectWithValue})=>{
        return _doPost(`/api/posts/${postId}`,rejectWithValue)
    }
)

export const getUserPosts = createAsyncThunk(
    "posts/getUserPosts",
    (username,{rejectWithValue})=>{
        return _get(`/api/posts/user/${username}`,rejectWithValue)
    }
)

export const createPost = createAsyncThunk(
    "posts/createPost",
    (postData,{rejectWithValue})=>{
        return _post(`/api/posts/`,{postData},rejectWithValue)
    }
)

export const editPost = createAsyncThunk(
    "posts/editPost",
    ({postId,postData},{rejectWithValue})=>{
        return _post(`/api/posts/edit/${postId}`,{postData},rejectWithValue)
    }
)

export const likePost = createAsyncThunk(
    "posts/likePost",
    (postId,{rejectWithValue})=>{
        return _doPost(`/api/posts/like/${postId}`,rejectWithValue)
    }
)

export const dislikePost = createAsyncThunk(
    "posts/dislikePost",
    (postId,{rejectWithValue})=>{
        return _doPost(`/api/posts/dislike/${postId}`,rejectWithValue)
    }
)

export const deletePost = createAsyncThunk(
    "posts/deletePost",
    (postId,{rejectWithValue})=>{
        return _delete(`/api/posts/${postId}`,rejectWithValue)
    }
)

export const postSlice = createSlice({
    name : "posts",
    initialState : {
        posts : [],
        error : ''
    },
    reducers : {},
    extraReducers : (builder)=>{
        builder
            .addCase(getAllPosts.pending,(state,{payload})=>{
                state.error = ""
            })
            .addCase(getAllPosts.fulfilled,(state,{payload})=>{
                state.posts = payload?.data?.posts
            })
            .addCase(getAllPosts.rejected,(state,action)=>{
                state.error = action.payload?.response?.data?.errors[0]
            })
            //getPost
            .addCase(getPost.pending,(state,action)=>{
                state.error = ""
            })
            .addCase(getPost.fulfilled,(state,{payload})=>{
                state.posts = payload?.data?.posts
            })
            .addCase(getPost.rejected,(state,action)=>{
                state.error = action.payload?.response?.data?.errors[0]
            })
            //getUserPosts
            .addCase(getUserPosts.pending,(state,action)=>{
                state.error = ""
            })
            .addCase(getUserPosts.fulfilled,(state,{payload})=>{
                state.posts = payload?.data?.posts
            })
            .addCase(getUserPosts.rejected,(state,action)=>{
                state.error = action.payload?.response?.data?.errors[0]
            })
            //createPost
            .addCase(createPost.pending,(state,action)=>{
                state.error = ""
            })
            .addCase(createPost.fulfilled,(state,{payload})=>{
                state.posts = payload?.data?.posts
            })
            .addCase(createPost.rejected,(state,action)=>{
                state.error = action.payload?.response?.data?.errors[0]
            })
            //editPost
            .addCase(editPost.pending,(state,action)=>{
                state.error = ""
            })
            .addCase(editPost.fulfilled,(state,{payload})=>{
                state.posts = payload?.data?.posts
            })
            .addCase(editPost.rejected,(state,action)=>{
                state.error = action.payload?.response?.data?.errors[0]
            })
            //likePost
            .addCase(likePost.pending,(state,action)=>{
                state.error = ""
            })
            .addCase(likePost.fulfilled,(state,{payload})=>{
                state.posts = payload?.data?.posts
            })
            .addCase(likePost.rejected,(state,action)=>{
                state.error = action.payload?.response?.data?.errors[0]
            })
            //dislikePost
            .addCase(dislikePost.pending,(state,action)=>{
                state.error = ""
            })
            .addCase(dislikePost.fulfilled,(state,{payload})=>{
                state.posts = payload?.data?.posts
            })
            .addCase(dislikePost.rejected,(state,action)=>{
                state.error = action.payload?.response?.data?.errors[0]
            })
            //deletePost
            .addCase(deletePost.pending,(state,action)=>{
                state.error = ""
            })
            .addCase(deletePost.fulfilled,(state,{payload})=>{
                state.posts = payload?.data?.posts
            })
            .addCase(deletePost.rejected,(state,{payload})=>{
                state.error = payload?.response?.data?.errors[0]
            })
    }
})

export const postReducer = postSlice.reducer
export const usePost=()=>useSelector((state)=>state.posts)