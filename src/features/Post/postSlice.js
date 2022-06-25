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
        return _doPost(`/api/posts/${username}`,rejectWithValue)
    }
)

export const createPost = createAsyncThunk(
    "posts/createPost",
    (post,{rejectWithValue})=>{
        return _post(`/api/user/posts/`,{post},rejectWithValue)
    }
)

export const editPost = createAsyncThunk(
    "posts/editPost",
    (post,{rejectWithValue})=>{
        return _post(`/api/user/posts/`,{post},rejectWithValue)
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
        return _delete(`/api/user/posts/${postId}`,rejectWithValue)
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
            .addCase(getPost.fulfilled,(state,action)=>{
                state.posts = action?.payload.data
            })
            .addCase(getPost.rejected,(state,action)=>{
                state.error = action.payload?.response?.data?.errors[0]
            })
            //getUserPosts
            .addCase(getUserPosts.pending,(state,action)=>{
                state.error = ""
            })
            .addCase(getUserPosts.fulfilled,(state,action)=>{
                state.error = action.payload?.data
            })
            .addCase(getUserPosts.rejected,(state,action)=>{
                state.error = action.payload?.response?.data?.errors[0]
            })
            //createPost
            .addCase(createPost.pending,(state,action)=>{
                state.error = ""
            })
            .addCase(createPost.fulfilled,(state,action)=>{
                state.posts = action.payload?.data
            })
            .addCase(createPost.rejected,(state,action)=>{
                state.error = action.payload?.response?.data?.errors[0]
            })
            //editPost
            .addCase(editPost.pending,(state,action)=>{
                state.error = ""
            })
            .addCase(editPost.fulfilled,(state,action)=>{
                state.posts = action.payload?.data
            })
            .addCase(editPost.rejected,(state,action)=>{
                state.error = action.payload?.response?.data?.errors[0]
            })
            //likePost
            .addCase(likePost.pending,(state,action)=>{
                state.error = ""
            })
            .addCase(likePost.fulfilled,(state,action)=>{
                state.posts = action.payload?.data
            })
            .addCase(likePost.rejected,(state,action)=>{
                state.error = action.payload?.response?.data?.errors[0]
            })
            //dislikePost
            .addCase(dislikePost.pending,(state,action)=>{
                state.error = ""
            })
            .addCase(dislikePost.fulfilled,(state,action)=>{
                state.posts = action.payload?.data
            })
            .addCase(dislikePost.rejected,(state,action)=>{
                state.error = action.payload?.response?.data?.errors[0]
            })
            //deletePost
            .addCase(deletePost.pending,(state,action)=>{
                state.error = ""
            })
            .addCase(deletePost.fulfilled,(state,action)=>{
                state.posts = action.payload?.data
            })
            .addCase(deletePost.rejected,(state,action)=>{
                state.error = action.payload?.response?.data?.errors[0]
            })
    }
})

export const postReducer = postSlice.reducer
export const usePost=()=>useSelector((state)=>state.posts)