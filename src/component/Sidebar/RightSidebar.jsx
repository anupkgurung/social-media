import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import {followUser,unFollowUser, useUser} from "../../features"

export const RightSidebar = ({users}) => {

    const dispatch = useDispatch()
    const {user} = useUser()
    const isFollowing = user?.following?.some(f => f._id === users._id)

    const handleFollowUnfollow = (userId)=>{
        if(isFollowing){
            dispatch(unFollowUser(userId))
        }else{
            dispatch(followUser(userId))            
        }
    }
    return (
        <div className="flex items-center p-2 pt-3 mb-4 rounded-lg shadow border">
            <Link className="flex items-center" to="/">
                <img loading="lazy" src={users.profileImg} alt={users.username}
                    className="w-10 h-10 mr-4 border object-cover object-top rounded-full flex-shrink-0 bg-gray-200" />
                <div className="text-sm flex flex-col content-start items-start  sm:text-base font-semibold">
                    <span>{users.firstName} {users.lastName}</span>
                    <span className="hidden sm:inline text-gray-500 text-sm font-normal">@{users.username}</span>
                </div>
            </Link>
            <button className="ml-auto" onClick={()=>handleFollowUnfollow(users._id)}>
                <span className="ml-auto text-blue-500 p-2 rounded-full hover:bg-blue-100">{isFollowing ? "Unfollow" : "Follow"}</span>
            </button>
        </div>
    )
}