import { useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { deleteComment, editComment, useAuth } from "../../features"

export const MultipleComments = ({comment,postId}) => {

    const [isEditComment, setIsEditComment] = useState(false)
    const [editedCommenData, setEditedCommentData] = useState(null)
    const {userInfo} = useAuth()
    const dispatch = useDispatch()

    // const handleCommentEditable = () => {
    //     setIsEditComment(isEditComment => !isEditComment)
    // }

    const handleCommentEditable = useCallback((text)=>{
        setIsEditComment(isEditComment => !isEditComment)
        setEditedCommentData(text)
    },[editedCommenData])

    const saveEditedComment = (postId,commentId) =>{
        dispatch(editComment({postId, commentId,commentData:{text : editedCommenData}}))
        setIsEditComment(isEditComment => !isEditComment)
    }

    const handleDeleteComment = (postId,commentId) => {
        dispatch(deleteComment({postId,commentId}))
    }

    return (
        <>  
            <div id="comment" className="flex flex-col border-t items-center justify-between p-4 mx-4">
                <div className="items-center w-full flex">
                    <img src={comment.profileImg}
                        alt={comment.username} className="cursor-pointer w-9 h-9 md:w-9 md:h-9 mr-4 border object-cover object-top rounded-full bg-gray-100 hover:opacity-40" />
                    <div className="items-center w-full flex bg-gray-200 rounded px-2">
                        {!isEditComment && 
                            <>
                                <p className="w-full flex items-center text-sm lg:text-base cursor-pointer text-justify h-10">
                                    {comment.text}
                                </p>
                            {comment.username === userInfo.username &&
                                <>
                                <button className="m-1 px-1 py-0.5 rounded hover:bg-blue-400"
                                    onClick={()=>handleCommentEditable(comment.text)}
                                >
                                    <span className="material-icons-outlined text-xl sm:text-[20px]">edit</span>
                                </button>
                                <button className="m-1 px-1 py-0.5 rounded hover:bg-blue-400 border-blue-400 text-sm"
                                    onClick={()=>handleDeleteComment(postId,comment._id)}
                                >
                                    <span className="material-icons-outlined text-xl sm:text-[20px]">delete</span>
                                </button>
                                </>
                            }
                            </>
                        }
                        {isEditComment && 
                            <>
                                <input className="outline-none border-b border-b-blue-400 h-8 text-base w-full dark:bg-gray-800" type="text" value={editedCommenData}
                                    onChange={(e) => setEditedCommentData(e.target.value)} />
                                <button className="m-1 px-1 pt-2 rounded hover:bg-blue-400 border-blue-400 text-sm"
                                    onClick={()=>saveEditedComment(postId,comment._id)}
                                >
                                    <span className="material-icons-outlined">done</span>
                                </button>
                                <button className="m-1 px-1 pt-2 rounded hover:bg-blue-400 border-blue-400 text-sm"
                                    onClick={handleCommentEditable}
                                >
                                    <span className="material-icons-outlined">close</span>
                                </button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}