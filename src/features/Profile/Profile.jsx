import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { UserFeed, Aside, Modal } from "../../component"
import { usePost, getUserPosts, useAuth, setEditProfile, useUser,getUser } from "../../features"

export const Profile = () => {

    let { posts } = usePost()
    const { userInfo } = useAuth()
    const {user, newProfileImg} = useUser()
    const dispatch = useDispatch()

    useEffect(() => {
        userInfo?.username && dispatch(getUserPosts(userInfo.username))
        && dispatch(getUser(userInfo._id))
    }, [dispatch])

    return (
        <><><Modal /></><div className="flex justify-center">
            <Aside sidebar={"left"} />
            <main className="main pb-12 px-2 md:px-0 w-[95%] mt-[4.2rem] md:mr-4 lg:mr-0 md:mt-[4rem] min-h-[calc(100vh-6.2rem)]">
                <div className="md:mt-0 mx-auto mb-4">
                    <div className="my-4 w-full md:mt-0 mx-auto border-b-[1px] border-t-[1px] bg-white flex flex-col relative">
                        <div className="flex h-[12rem]">
                            <img src="https://raw.githubusercontent.com/anupkgurung/images/main/quizimg/rulespage.png" alt="banner"
                                className="cursor-pointer w-full h-full rounded-t-lg bg-gray-200" />
                        </div>
                        <div className="flex p-2 pt-4">
                            {!newProfileImg && <img src={user?.profileImg} alt={user?.username}
                                className="cursor-pointer left-4 absolute top-28 w-36 h-36 md:w-36 md:h-36 mr-3 border-[5px] border-solid object-cover object-top flex-shrink-0 rounded-full border-white" />}
                            {newProfileImg && <img src={URL.createObjectURL(newProfileImg)} alt={user?.username}
                                className="cursor-pointer left-4 absolute top-28 w-36 h-36 md:w-36 md:h-36 mr-3 border-[5px] border-solid object-cover object-top flex-shrink-0 rounded-full border-white" />}
                            <button className="border ml-auto py-2 px-4 text-sm border-blue-400 rounded hover:bg-blue-400"
                                onClick={() => dispatch(setEditProfile())}
                            > Edit Profile</button>
                        </div>
                        <div className="mx-3 flex flex-col p-2 px-2 pt-5">
                            <div className="mr-auto"><span className="font-bold text-2xl">{user?.firstName} {user?.lastName}</span></div>
                            <div className="mt-[-.25rem] mr-auto"><span className="text-lg text-gray-400">@{user?.username}</span></div>
                        </div>
                        <div className="flex mx-3 flex-col p-2 px-2 pt-2">
                            <div className="mr-auto">
                                <p className="text-base">{user?.bio}</p>
                            </div>
                            <div className="mr-auto">
                                {Object.keys(user).length !==0 && <a className="underline text-blue-400" rel="noreferrer" href={user.portfolio} target="_blank" >{user?.portfolio}</a>}
                            </div>
                        </div>
                        <div className="flex mx-3 p-2 px-2 pt-2">
                            <div>
                                <span className="font-semibold">{user?.following?.length} Following</span>
                            </div>
                            <div className="ml-4">
                                <span className="font-semibold">{user?.followers?.length} Followers</span>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="p-4">
                    {posts?.map((post, id) => (
                        <UserFeed post={post} key={id} />
                    ))}
                </div>

            </main>
            <Aside sidebar="right" />
        </div></>
    )
}