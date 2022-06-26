import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const UserFeed = ({ post }) => {

    const [showPostMenu, setShowPostMenu] = useState(false)

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
                                <span className="mx-[6px] font-semibold">•</span>
                                {new Date(post.updatedAt).toDateString()}
                            </span>
                        </div>
                    </Link>
                    <div className="ml-auto relative">
                        <button className="mx-2 w-10 h-10 flex items-center justify-center rounded-full hover:cursor-pointer hover:text-blue-500 hover:bg-blue-100"
                            onClick={() => setShowPostMenu(showPostMenu => !showPostMenu)}>
                            <span className="material-icons-outlined text-2xl">more_horiz</span>
                        </button>
                        {showPostMenu && (<div class="absolute top-6 right-4 z-[1] bg-white shadow-xl flex flex-col p-2 border rounded-lg">
                            <button class="py-2 px-2 text-sm flex hover:bg-blue-100 rounded">
                                <span class="material-icons-outlined text-xl">edit</span>
                                
                            </button>
                            <button class=" py-2 px-2 text-sm flex hover:bg-blue-100 rounded">
                                <span class=" material-icons-outlined text-xl">delete</span>
                            </button>
                        </div>)}


                    </div>
                </section>

                <section className="flex flex-col items-center justify-center">
                    {post.media?.img &&
                        <img className="cursor-pointer mt-3 mb-1 max-h-[25rem] bg-gray-200"
                            src={post.media.img} alt="usermedia" />}

                    {post.content && <p className="w-full py-2 px-5 text-sm lg:text-base cursor-pointer my-2 text-justify">
                        {post.content}
                    </p>}
                </section>

                <section className="flex flex-row items-center justify-between py-2 mx-5">
                    <div className="flex text-gray-900">
                        <div className="flex items-center w-16">
                            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:text-blue-500 hover:bg-blue-100 ">
                                <span className="material-icons-outlined text-xl sm:text-[22px]">thumb_up</span>
                            </button>
                            <span className="text-sm ml-1">0</span>
                        </div>
                        <div className="flex items-center w-16">
                            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:text-blue-500 hover:bg-blue-100">
                                <span className="material-icons-outlined text-xl sm:text-[22px]">comment</span>
                            </button>
                            <span className="text-sm ml-1">0</span>
                        </div>
                        <div className="flex items-center w-16">
                            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:text-blue-500 hover:bg-blue-100">
                                <span className="material-icons-outlined text-xl mr-[2px] sm:text-[22px]">share</span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <button data-tooltip="Bookmark" className="tooltip w-10 h-10 flex items-center justify-center rounded-full hover:text-blue-500 hover:bg-blue-100">
                            <span className="material-icons-outlined text-xl sm:text-[22px]">bookmark_border</span>
                        </button>
                    </div>
                </section>
            </article>
        </div>
    )
}