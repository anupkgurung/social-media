import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { UserFeed, Aside } from "../../component"
import { useDocumentTitle } from "../../customhook/useDocumentTitle"
import { getBookmarks,useUser, usePost } from "../../features"

export const Bookmark = () => {

    useDocumentTitle("Bookmark")
    const { bookmarks } = useUser()
    const dispatch = useDispatch()
    const {posts} = usePost()

    useEffect(()=>{
        dispatch(getBookmarks())
    },[dispatch, posts])
   
    return (
        <div className="flex justify-center gap-4">
            <Aside sidebar={"left"}/>
            <main className="main pb-12 px-2 md:px-0 w-full mt-[4.2rem] md:mr-4 lg:mr-0 md:mt-[6.2rem] min-h-[calc(100vh-6.2rem)]">
                {bookmarks?.map((post, id) => (
                    <UserFeed post={post} key={id} />
                ))}
            </main>
            <Aside sidebar="right"/>
        </div>
    )
}