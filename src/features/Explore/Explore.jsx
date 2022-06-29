import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { UserFeed, Aside } from "../../component"
import { usePost, getAllPosts } from ".."

export const Explore = () => {

    const { posts } = usePost()
    const dispatch = useDispatch()
   
    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    return (
        <div className="flex justify-center gap-4">
            <Aside sidebar={"left"}/>
            <main className="main pb-12 px-2 md:px-0 w-full mt-[4.2rem] md:mr-4 lg:mr-0 md:mt-[6.2rem] min-h-[calc(100vh-6.2rem)]">
                {posts?.map((post, id) => (
                    <UserFeed post={post} key={id} />
                ))}
            </main>
            <Aside sidebar="right"/>
        </div>
    )
}