import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { likePost, dislikePost, deletePost, editPost, addToBookmark, deleteBookmark, useUser, addComment, usePost, useAuth, getPost } from "../../features"
import { Comment } from "../../component"

export const UserFeed = ({ post }) => {

    const { bookmarks } = useUser()
    const{comments,singlePost} =usePost()
    const {userInfo} = useAuth()
    const [hasEditPost, setHasEditPost] = useState(false)
    const [newPostData, setNewPostData] = useState({ content: null, media: null })
    const [showComments, setShowComments] = useState(false)
    const [postId,setPostId] = useState(null)

    const [commentData, setCommentData] = useState({text:null,profileImg:userInfo.profileImg})
    const isBookmarked = bookmarks?.some(obj => obj._id === post._id)
    const hasLike = post.likes.likeCount > 0
    const dispatch = useDispatch();

    const handleLikePost = (id) => {
        if (!hasLike) {
            dispatch(likePost(id))
        } else {
            dispatch(dislikePost(id))
        }
    }

    const handleDeletePost = (id) => {
        dispatch(deletePost(id))
    }
    const enableEditPost = () => {
        setHasEditPost(hasEditPost => !hasEditPost)
    }
    const handleEditPost = (id) => {
        dispatch(editPost({ postId: id, postData: newPostData }))
        setHasEditPost(hasEditPost => !hasEditPost)
    }
    const handleEditPostData = (e) => {
        setNewPostData(newPostData => ({
            ...newPostData,
            [e.target.id]: e.target.value
        }))
    }

    const handleAddToBookmark = (id) => {
        if (!isBookmarked) {
            dispatch(addToBookmark(id))
        } else {
            dispatch(deleteBookmark(id))
        }
    }
    
    const handleAddComment = (postId)=>{
        dispatch(addComment({postId,commentData}))
    }
    
    return (
        <div>
            <article className="border rounded-lg my-4 md:mt-0 mx-auto shadow-md bg-white">
                <section className="pr-2 pl-4 pt-4 flex items-center">
                    <Link to={"/"} className="flex items-center" >
                        <img src={post.profileImg}
                            alt="profileImg" className=" cursor-pointer w-11 h-11 md:w-12 md:h-12 mr-4 border object-cover object-top rounded-full bg-gray-200 hover:opacity-40" />
                        <div>
                            <span className="font-semibold flex">{post.firstName} {post.lastName}</span>
                            <span className="text-gray-500 text-sm font-normal flex items-center line-clamp-1">
                                @{post.username}
                                <span className="mx-[6px] font-semibold">|</span>
                                {new Date(post.updatedAt).toDateString()}
                            </span>
                        </div>
                    </Link>
                </section>

                <section className="flex flex-col items-center justify-center">
                    {post.media?.img &&
                        <img className="cursor-pointer mt-3 mb-1 max-h-[25rem] bg-gray-200"
                            src={post.media.img} alt="usermedia" />}
                    {post.content && !hasEditPost && <p className="w-full py-2 px-5 text-sm lg:text-base cursor-pointer my-2 text-justify">
                        {post.content}
                    </p>}
                    {hasEditPost && (
                        <div className="w-full p-2 flex flex-col">
                            <textarea id="content" className="w-full py-2 px-5 text-sm lg:text-base outline-blue-400 rounded border border-blue-400 my-2 text-justify"
                                onChange={handleEditPostData}
                            >{post.content}</textarea>
                            <button className="border py-1 px-4 text-sm border-blue-400 rounded font-semibold ml-auto hover:bg-blue-400 "
                                onClick={() => handleEditPost(post._id)}
                            >save</button>
                        </div>
                    )}
                </section>

                <section className="flex flex-row items-center justify-between py-2 mx-5">
                    <div className="flex text-gray-900">
                        <div className="flex items-center w-16">
                            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:text-blue-500 hover:bg-blue-100"
                                onClick={() => handleLikePost(post._id)}>
                                <span className="material-icons-outlined text-xl sm:text-[22px]">{hasLike ? 'favorite' : 'favorite_border'}</span>
                            </button>
                            <span className="text-sm ml-1">{post.likes.likeCount}</span>
                        </div>
                        <div className="flex items-center w-16">
                            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:text-blue-500 hover:bg-blue-100" 
                                onClick={()=>setShowComments(showComments => !showComments)}
                            >
                                <span className="material-icons-outlined text-xl sm:text-[22px]">comment</span>
                            </button>
                            <span className="text-sm ml-1">{post.comments.length}</span>
                        </div>

                        <div className="flex items-center w-14">
                            <button className="w-10 h-10 flex items-center justify-center hover:bg-blue-100 rounded-full hover:text-blue-500" onClick={() => enableEditPost()}>
                                <span className="material-icons-outlined text-xl sm:text-[22px]">edit</span>
                            </button>
                        </div>
                        <div className="flex items-center w-16">
                            <button className="w-10 h-10 flex items-center justify-center hover:bg-blue-100 rounded-full hover:text-blue-500" onClick={() => handleDeletePost(post._id)}>
                                <span className=" material-icons-outlined text-xl sm:text-[22px]">delete</span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:text-blue-500 hover:bg-blue-100"
                            onClick={() => handleAddToBookmark(post._id)}
                        >
                            <span className="material-icons-outlined text-xl sm:text-[22px]">{isBookmarked ? 'bookmark' : 'bookmark_border'}</span>
                        </button>
                    </div>
                </section>
                {showComments && 
                (<><div id="post-comment" className="flex flex-row border-t items-center justify-between p-4 mx-4">
                    <div className="items-center w-full flex">
                        <img src={post.profileImg}
                            alt="profileImg" className="cursor-pointer w-9 h-9 md:w-10 md:h-10 mr-4 border object-cover object-top rounded-full bg-gray-200 hover:opacity-40" />
                        <input className="outline-none border-b border-b-blue-400 h-8 text-base w-full dark:bg-gray-800" type="text" 
                            onChange={(e)=>setCommentData(commentData => ({...commentData, text:e.target.value}))}
                        />
                        <button className="m-1 px-1 py-0.5 rounded hover:bg-blue-400 border-blue-400 text-sm"
                            onClick={()=>handleAddComment(post._id)}
                        >
                            <span class="material-icons-outlined">reply</span>
                        </button>
                    </div>
                </div>
                    <>
                        {post.comments.map(comment => (
                            <Comment comment = {comment}/>
                            )) 
                        }
                    </>
                </>
                )}
            </article>
        </div>
    )
}