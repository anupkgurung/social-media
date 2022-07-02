import { useState } from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { UserFeed, Aside } from "../../component"
import { usePost, useAuth, getUserPosts,createPost } from "../../features"
import { setSortBy } from "../Post/postSlice"
import { useUser } from "../User/userSlice"

export const Home = () => {

    let { posts, sortBy } = usePost()
    const {userInfo} = useAuth()
    const dispatch = useDispatch()
    const[postData,setPostData] = useState({content:null,media:null,profileImg:null})
    const {newProfileImg} = useUser()

    const handleSetPostData = (e) => {
        setPostData(postData => ({
            ...postData,
            [e.target.id] : e.target.value,
            profileImg : userInfo.profileImg
        }))
    }
    const handleCreatePost = () => {
       dispatch(setSortBy(""))
       dispatch(createPost(postData))
    }

    const getSortedPost = (sortBy) => {
        if(sortBy === "like"){
            return [...posts].sort((p1,p2) => p2.likes.likeCount - p1.likes.likeCount)
        }else if(sortBy === "date"){
            return [...posts].sort((p1,p2) => new Date(p1.updatedAt) - new Date(p2.updatedAt))
        }else {
            return posts
        }
    }
    posts = getSortedPost(sortBy)

    const handleSortBy = (sortBy) => {
        dispatch(setSortBy(sortBy))
    }

    useEffect(() => {
        userInfo?.username && dispatch(getUserPosts(userInfo.username))
    }, [dispatch])

    return (
        <div className="flex justify-center gap-4">
            <Aside sidebar={"left"}/>
            <main className="main pb-12 px-2 md:px-0 w-full mt-[4.2rem] md:mr-4 lg:mr-0 md:mt-[6.2rem] min-h-[calc(100vh-6.2rem)]">
                <div className="mt-6 md:mt-0 mx-auto mb-4">
                    <h4 className="font-semibold text-xl mb-4 text-center">Feed</h4>
                    <div className="rounded-lg border my-4 w-full md:mt-0 mx-auto shadow-md bg-white flex flex-col">
                        <div className="flex p-2 pt-4">
                            {!newProfileImg && <img src={userInfo?.profileImg} alt={userInfo?.username}
                                className="w-11 h-11 md:w-12 md:h-12 mr-3 border object-cover object-top flex-shrink-0 rounded-full bg-gray-200" />}
                            {newProfileImg && <img src={URL.createObjectURL(newProfileImg)} alt={userInfo?.username}
                                className="w-11 h-11 md:w-12 md:h-12 mr-3 border object-cover object-top flex-shrink-0 rounded-full bg-gray-200" />}
                            <textarea id="content" className="focus:outline-blue-400 bg-white w-full p-2 rounded-lg border" placeholder="What's in your mind ?" name="post" defaultValue={""} 
                                onChange={handleSetPostData}
                            ></textarea>
                        </div>
                        <div className="ml-auto p-2">
                            <button title="Add post" className="border py-2 px-4 text-sm border-blue-400 rounded" onClick={handleCreatePost}>
                                Add Post
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 my-6">
                        <button title="Sort by Latest" className="w-full border flex items-center justify-center font-semibold py-2 px-4 rounded border-blue-400 text-sm"
                             onClick={()=>handleSortBy("date")}
                        >
                            <span className="material-icons-outlined mr-2">sort</span>Latest
                        </button>
                        <button title="Sort by Trending" className="w-full border flex items-center justify-center font-semibold py-2 px-4 rounded border-blue-400 text-sm"
                            onClick={()=>handleSortBy("like")}
                        >
                            <span className="material-icons-outlined mr-2">trending_up</span>Trending
                        </button>
                    </div>
                </div>
                {posts?.filter(post => post.username === userInfo.username).map((post, id) => (
                    <UserFeed post={post} key={id} />
                ))}
            </main>
            <Aside sidebar="right"/>
        </div>
    )
}