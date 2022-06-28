import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { likePost, dislikePost, deletePost, editPost, addToBookmark, deleteBookmark, useUser } from "../../features"

export const UserFeed = ({ post }) => {

    const [hasEditPost, setHasEditPost] = useState(false)
    const [newPostData, setNewPostData] = useState({ content: null, media: null })

    const { bookmarks } = useUser()
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
    return (
        <div>
            <article className="border rounded-lg my-4 md:mt-0 mx-auto shadow-md bg-white">
                <section className="pr-2 pl-4 pt-4 flex items-center">
                    <Link to={"/"} className="flex items-center" >
                        <img src={post.profileImg}
                            alt="profileImg" className="w-11 h-11 md:w-12 md:h-12 mr-4 border object-cover object-top rounded-full bg-gray-200 hover:opacity-75" />
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
                            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:text-blue-500 hover:bg-blue-100">
                                <span className="material-icons-outlined text-xl sm:text-[22px]">comment</span>
                            </button>
                            <span className="text-sm ml-1">0</span>
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
            </article>
        </div>
    )
}