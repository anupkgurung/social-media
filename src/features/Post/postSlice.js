import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { _get, _post, _doPost, _delete } from "../../service";

export const getAllPosts = createAsyncThunk(
    "posts/getAllPosts",
    async(_,{rejectWithValue})=>{
       try {
        const {data}  = await _get("/api/posts",rejectWithValue)
        return data
       } catch (error) {
           rejectWithValue(error)
       }
    }
)

export const getPost = createAsyncThunk(
    "posts/getPost",
    async(postId,{rejectWithValue})=>{
        try {
            const {data} = await _doPost(`/api/posts/${postId}`,rejectWithValue)
            return data
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const getUserPosts = createAsyncThunk(
    "posts/getUserPosts",
    async(username,{rejectWithValue})=>{
        try {
            const {data} = await _get(`/api/posts/user/${username}`,rejectWithValue)
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const createPost = createAsyncThunk(
    "posts/createPost",
    async(postData,{rejectWithValue})=>{
        const {data} = await _post(`/api/posts/`,{postData},rejectWithValue)
        return data
    }
)

export const editPost = createAsyncThunk(
    "posts/editPost",
    async({postId,postData},{rejectWithValue})=>{
        const {data} = await _post(`/api/posts/edit/${postId}`,{postData},rejectWithValue)
        return data
    }
)

export const likePost = createAsyncThunk(
    "posts/likePost",
    async(postId,{rejectWithValue})=>{
        const { data : {posts} } = await _doPost(`/api/posts/like/${postId}`,rejectWithValue)
        return posts
    }
)

export const dislikePost = createAsyncThunk(
    "posts/dislikePost",
    async(postId,{rejectWithValue})=>{
        const {data} = await _doPost(`/api/posts/dislike/${postId}`,rejectWithValue)
        return data
    }
)

export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async(postId,{rejectWithValue})=>{
        const {data} =await _delete(`/api/posts/${postId}`,rejectWithValue)
        return data
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
                state.posts = payload?.posts
            })
            .addCase(getAllPosts.rejected,(state,action)=>{
                state.error = action.payload?.response?.data?.errors[0]
            })
            //getPost
            .addCase(getPost.pending,(state,action)=>{
                state.error = ""
            })
            .addCase(getPost.fulfilled,(state,{payload})=>{
                state.posts = payload?.posts
            })
            .addCase(getPost.rejected,(state,action)=>{
                state.error = action.payload?.response?.data?.errors[0]
            })
            //getUserPosts
            .addCase(getUserPosts.pending,(state,action)=>{
                state.error = ""
            })
            .addCase(getUserPosts.fulfilled,(state,{payload})=>{
                state.posts = payload?.posts.reverse()
            })
            .addCase(getUserPosts.rejected,(state,action)=>{
                state.error = action.payload?.response?.data?.errors[0]
            })
            //createPost
            .addCase(createPost.pending,(state,action)=>{
                state.error = ""
            })
            .addCase(createPost.fulfilled,(state,{payload})=>{
                state.posts = payload?.posts.reverse()
            })
            .addCase(createPost.rejected,(state,action)=>{
                state.error = action.payload?.response?.data?.errors[0]
            })
            //editPost
            .addCase(editPost.pending,(state,action)=>{
                state.error = ""
            })
            .addCase(editPost.fulfilled,(state,{payload})=>{
                state.posts = payload?.posts
            })
            .addCase(editPost.rejected,(state,action)=>{
                state.error = action.payload?.response?.data?.errors[0]
            })
            //likePost
            .addCase(likePost.pending,(state,action)=>{
                state.error = ""
            })
            .addCase(likePost.fulfilled,(state,{payload})=>{
                state.posts = payload
            })
            .addCase(likePost.rejected,(state,action)=>{
                state.error = action.payload?.response?.data?.errors[0]
            })
            //dislikePost
            .addCase(dislikePost.pending,(state,action)=>{
                state.error = ""
            })
            .addCase(dislikePost.fulfilled,(state,{payload})=>{
                state.posts = payload?.posts
            })
            .addCase(dislikePost.rejected,(state,action)=>{
                state.error = action.payload?.response?.data?.errors[0]
            })
            //deletePost
            .addCase(deletePost.pending,(state,action)=>{
                state.error = ""
            })
            .addCase(deletePost.fulfilled,(state,{payload})=>{
                state.posts = payload?.posts
            })
            .addCase(deletePost.rejected,(state,{payload})=>{
                state.error = payload?.response?.data?.errors[0]
            })
    }
})

export const postReducer = postSlice.reducer
export const usePost=()=>useSelector((state)=>state.posts)