import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import {addComment, useAuth, usePost, getPostComment, getUserPosts} from "../../features"
import { MultipleComments } from "./MultipleComments"

export const Comment = ({postId}) => {
    
    const {userInfo} = useAuth()
    const dispatch = useDispatch()
    const [commentData, setCommentData] = useState({text:null,profileImg:userInfo.profileImg})
    const {comments} = usePost()

    const handleAddComment = (postId)=>{
        dispatch(addComment({postId,commentData}))
        setCommentData(commentData => ({...commentData, text:""}))
    }

    useEffect(()=>{
        dispatch(getPostComment(postId))
        userInfo?.username && dispatch(getUserPosts(userInfo.username))
    },[dispatch])

    return (
        <>
            <div id="post-comment" className="flex flex-row border-t items-center justify-between p-4 mx-4">
                <div className="items-center w-full flex">
                    <img src={userInfo.profileImg}
                        alt="profileImg" className="cursor-pointer w-9 h-9 md:w-10 md:h-10 mr-4 border object-cover object-top rounded-full bg-gray-200 hover:opacity-40" />
                    <input className="outline-none border-b border-b-blue-400 h-8 text-base w-full dark:bg-gray-800" type="text" value={commentData.text}
                        onChange={(e) => setCommentData(commentData => ({ ...commentData, text: e.target.value }))} />
                    <button className="m-1 px-1 py-0.5 rounded hover:bg-blue-400 border-blue-400 text-sm"
                        onClick={() => handleAddComment(postId)}
                    >
                        <span className="material-icons-outlined">reply</span>
                    </button>
                </div>
            </div>
            {
                comments && comments.map(comment => (
                    <MultipleComments comment= {comment} postId={postId} key={comment._id}/>
                ))
            }
        </>
    )
}