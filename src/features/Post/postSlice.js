import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { _get, _post, _doPost, _delete } from "../../service";

export const getAllPosts = createAsyncThunk(
    "posts/getAllPosts",
    async(_,{rejectWithValue})=>{
        try {
            const {data} = await _get("/api/posts",rejectWithValue)
            return data    
        } catch (error) {
            rejectWithValue("error fetching post")
        }
        
    }
)

export const getPost = createAsyncThunk(
    "posts/getPost",
    async(postId,{rejectWithValue})=>{
        try {
            const {data : {post}} = await _get(`/api/posts/${postId}`,rejectWithValue)
            return post
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
            rejectWithValue(error)
        }
    }
)

export const createPost = createAsyncThunk(
    "posts/createPost",
    async(postData,{rejectWithValue})=>{
        try {
            const {data} = await _post(`/api/posts/`,{postData},rejectWithValue)
            return data
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const editPost = createAsyncThunk(
    "posts/editPost",
    async({postId,postData},{rejectWithValue})=>{
        try {
            const {data} = await _post(`/api/posts/edit/${postId}`,{postData},rejectWithValue)
            return data
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const likePost = createAsyncThunk(
    "posts/likePost",
    async(postId,{rejectWithValue})=>{
        try {
            const { data : {posts} } = await _doPost(`/api/posts/like/${postId}`,rejectWithValue)
            return posts
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const dislikePost = createAsyncThunk(
    "posts/dislikePost",
    async(postId,{rejectWithValue})=>{
        try {
            const {data} = await _doPost(`/api/posts/dislike/${postId}`,rejectWithValue)
            return data
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async(postId,{rejectWithValue})=>{
        try {
            const {data} =await _delete(`/api/posts/${postId}`,rejectWithValue)
            return data
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const addComment = createAsyncThunk(
    "posts/addComment",
    async({postId,commentData},{rejectWithValue})=>{
        try {
            const {data : {comments}} = await _post(`/api/comments/add/${postId}`,{commentData})
            return comments
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const getPostComment = createAsyncThunk(
    "posts/getPostComment",
    async(postId,{rejectWithValue})=>{
        try {
            const {data : {comments}} = await _get(`/api/comments/${postId}`)
            return comments
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const editComment = createAsyncThunk(
    "posts/editComment",
    async({postId,commentId,commentData},{rejectWithValue})=>{
       try {
            const {data : {comments}} = await _post(`/api/comments/edit/${postId}/${commentId}`,{commentData})
            return comments
       } catch (error) {
           rejectWithValue(error)
       }
    }
)

export const deleteComment = createAsyncThunk(
    "posts/deleteComment",
    async({postId,commentId},{rejectWithValue})=>{
        try {
            const {data : {comments}} = await _delete(`/api/comments/delete/${postId}/${commentId}`)
            return comments
        } catch (error) {
            rejectWithValue(error)
        }
    }
)

export const postSlice = createSlice({
    name : "posts",
    initialState : {
        posts : [],
        error : '',
        singlePost :[],
        sortBy : '',
        comments : [],
        isLoadingPost : false
    },
    reducers : {
        setSortBy : (state,{payload})=>{
            state.sortBy = payload
        }
    },
    extraReducers : (builder)=>{
        builder
            .addCase(getAllPosts.pending,(state)=>{
                state.isLoadingPost = true
            })
            .addCase(getAllPosts.fulfilled,(state,{payload})=>{
                state.isLoadingPost = false
                state.posts = payload?.posts.reverse()
            })
            .addCase(getAllPosts.rejected,(state)=>{
                state.isLoadingPost = false
            })
            //getPost
            .addCase(getPost.pending,(state)=>{
                state.isLoadingPost = true
            })
            .addCase(getPost.fulfilled,(state,{payload})=>{
                state.singlePost = payload
            })
            .addCase(getPost.rejected,(state)=>{
                state.isLoadingPost = false
            })
            //getUserPosts
            .addCase(getUserPosts.pending,(state)=>{
                state.isLoadingPost = true
            })
            .addCase(getUserPosts.fulfilled,(state,{payload})=>{
                state.posts = payload?.posts.reverse()
            })
            .addCase(getUserPosts.rejected,(state,action)=>{
                state.isLoadingPost = false
            })
            //createPost
            .addCase(createPost.pending,(state)=>{
                state.isLoadingPost = true
            })
            .addCase(createPost.fulfilled,(state,{payload})=>{
                state.posts = payload?.posts.reverse()
            })
            .addCase(createPost.rejected,(state)=>{
                state.isLoadingPost = false
            })
            //editPost
            .addCase(editPost.pending,(state)=>{
                state.isLoadingPost = true
            })
            .addCase(editPost.fulfilled,(state,{payload})=>{
                state.posts = payload?.posts.reverse()
            })
            .addCase(editPost.rejected,(state)=>{
                state.isLoadingPost = false
            })
            //likePost
            .addCase(likePost.fulfilled,(state,{payload})=>{
                state.posts = payload.reverse()
            })
            .addCase(likePost.rejected,(state)=>{
                state.isLoadingPost = false
            })
            //dislikePost
            .addCase(dislikePost.fulfilled,(state,{payload})=>{
                state.posts = payload?.posts.reverse()
            })
            .addCase(dislikePost.rejected,(state)=>{
                state.isLoadingPost = false
            })
            //deletePost
            .addCase(deletePost.fulfilled,(state,{payload})=>{
                state.posts = payload?.posts.reverse()
            })
            .addCase(deletePost.rejected,(state)=>{
                state.isLoadingPost = false
            })
            //get comments
            .addCase(getPostComment.fulfilled,(state,{payload})=>{
                state.comments = payload?.reverse()
            })
            .addCase(getPostComment.rejected,(state)=>{
                state.isLoadingPost = false
            })
            //add comments
            .addCase(addComment.fulfilled,(state,{payload})=>{
                state.comments = payload?.reverse()
            })
            .addCase(addComment.rejected,(state)=>{
                state.isLoadingPost = false
            })
            //remove comment
            .addCase(editComment.fulfilled,(state,{payload})=>{
                state.comments = payload?.reverse()
            })
            .addCase(editComment.rejected,(state)=>{
                state.isLoadingPost = false
            })
            //edit comment
            .addCase(deleteComment.fulfilled,(state,{payload})=>{
                state.comments = payload?.reverse()
            })
            .addCase(deleteComment.rejected,(state)=>{
                state.isLoadingPost = false
            })
    }
})

export const postReducer = postSlice.reducer
export const {setSortBy} = postSlice.actions;
export const usePost=()=>useSelector((state)=>state.posts)