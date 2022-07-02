import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { _get, _post, _doPost, _delete } from "../../service";

export const getAllPosts = createAsyncThunk(
    "posts/getAllPosts",
    async(_,{rejectWithValue})=>{
        const {data} = await _get("/api/posts",rejectWithValue)
        return data
    }
)

export const getPost = createAsyncThunk(
    "posts/getPost",
    async(postId,{rejectWithValue})=>{
        const {data : {post}} = await _get(`/api/posts/${postId}`,rejectWithValue)
        return post
    }
)

export const getUserPosts = createAsyncThunk(
    "posts/getUserPosts",
    async(username,{rejectWithValue})=>{
        const {data} = await _get(`/api/posts/user/${username}`,rejectWithValue)
        return data
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

export const addComment = createAsyncThunk(
    "posts/addComment",
    async({postId,commentData},{rejectWithValue})=>{
        const {data : {comments}} = await _post(`/api/comments/add/${postId}`,{commentData})
        return comments
    }
)

export const getPostComment = createAsyncThunk(
    "posts/getPostComment",
    async(postId,{rejectWithValue})=>{
        const {data : {comments}} = await _get(`/api/comments/${postId}`)
        return comments
    }
)

export const editComment = createAsyncThunk(
    "posts/editComment",
    async({postId,commentId,commentData},{rejectWithValue})=>{
        const {data : {comments}} = await _post(`/api/comments/edit/${postId}/${commentId}`,{commentData})
        return comments
    }
)

export const deleteComment = createAsyncThunk(
    "posts/deleteComment",
    async({postId,commentId},{rejectWithValue})=>{
        const {data : {comments}} = await _delete(`/api/comments/delete/${postId}/${commentId}`)
        return comments
    }
)

export const postSlice = createSlice({
    name : "posts",
    initialState : {
        posts : [],
        error : '',
        singlePost :[],
        sortBy : '',
        comments : []
    },
    reducers : {
        setSortBy : (state,{payload})=>{
            state.sortBy = payload
        }
    },
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
                state.singlePost = payload
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
                state.posts = payload?.posts.reverse()
            })
            .addCase(editPost.rejected,(state,action)=>{
                state.error = action.payload?.response?.data?.errors[0]
            })
            //likePost
            .addCase(likePost.fulfilled,(state,{payload})=>{
                state.posts = payload.reverse()
            })
            .addCase(likePost.rejected,(state,action)=>{
                state.error = action.payload?.response?.data?.errors[0]
            })
            //dislikePost
            .addCase(dislikePost.fulfilled,(state,{payload})=>{
                state.posts = payload?.posts.reverse()
            })
            .addCase(dislikePost.rejected,(state,action)=>{
                state.error = action.payload?.response?.data?.errors[0]
            })
            //deletePost
            .addCase(deletePost.fulfilled,(state,{payload})=>{
                state.posts = payload?.posts.reverse()
            })
            .addCase(deletePost.rejected,(state,{payload})=>{
                state.error = payload?.response?.data?.errors[0]
            })
            //get comments
            .addCase(getPostComment.fulfilled,(state,{payload})=>{
                state.comments = payload?.reverse()
            })
            .addCase(getPostComment.rejected,(state,{payload})=>{
                state.error = payload?.response?.data?.errors[0]
            })
            //add comments
            .addCase(addComment.fulfilled,(state,{payload})=>{
                state.comments = payload?.reverse()
            })
            .addCase(addComment.rejected,(state,{payload})=>{
                state.error = payload?.response?.data?.errors[0]
            })
            //remove comment
            .addCase(editComment.fulfilled,(state,{payload})=>{
                state.comments = payload?.reverse()
            })
            .addCase(editComment.rejected,(state,{payload})=>{
                state.error = payload?.response?.data?.errors[0]
            })
            //edit comment
            .addCase(deleteComment.fulfilled,(state,{payload})=>{
                state.comments = payload?.reverse()
            })
            .addCase(deleteComment.rejected,(state,{payload})=>{
                state.error = payload?.response?.data?.errors[0]
            })
    }
})

export const postReducer = postSlice.reducer
export const {setSortBy} = postSlice.actions;
export const usePost=()=>useSelector((state)=>state.posts)