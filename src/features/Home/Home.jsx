import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { UserFeed, Aside } from "../../component"
import { usePost, getAllPosts } from "../../features"

export const Home = () => {

    const { posts } = usePost()
    const dispatch = useDispatch()
   
    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    return (
        <div className="flex justify-center gap-8">
            <Aside sidebar={"left"}/>
            <main className="main pb-12 px-2 md:px-0 w-full mt-[4.2rem] md:mr-4 lg:mr-0 md:mt-[6.2rem] min-h-[calc(100vh-6.2rem)]">
                <div class="mt-6 md:mt-0 mx-auto mb-4">
                    <h4 class="font-semibold text-xl mb-4 text-center">Feed</h4>
                    <div className="rounded-lg border my-4 w-full md:mt-0 mx-auto shadow-md bg-white flex flex-col">
                        <div className="flex p-2 pt-4">
                            <img loading="lazy" src="https://raw.githubusercontent.com/anupkgurung/images/main/social/anup.jpg" alt="profileimg"
                                class="w-11 h-11 md:w-12 md:h-12 mr-3 border object-cover object-top flex-shrink-0 rounded-full bg-gray-200" />
                            <textarea className="focus:outline-blue-400 bg-white w-full p-2 rounded-lg border" name="post" id="post" >asd</textarea>
                        </div>
                        <div className="ml-auto p-2">
                            <button title="Add post" class="border btn py-2 px-4 text-sm border-blue-400 rounded">
                                Add Post
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 my-6">
                        <span class="flex-shrink-0 text-sm font-semibold">Sort by:</span>
                        <button title="Sort by Recent" class="btn w-full border flex items-center justify-center font-semibold py-2 px-4 rounded border-blue-400 text-sm">
                            <span class="material-icons-outlined mr-2">view_timeline</span>Recent
                        </button>
                        <button title="Sort by Trending" class="btn w-full border flex items-center justify-center font-semibold py-2 px-4 rounded border-blue-400 text-sm">
                            <span class="material-icons-outlined mr-2">trending_up</span>Trending
                        </button>
                    </div>
                </div>
                {posts?.map((post, id) => (
                    <UserFeed post={post} key={id} />
                ))}
            </main>
            <Aside sidebar="right"/>
        </div>
    )
}