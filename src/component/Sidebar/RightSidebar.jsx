import { Link } from "react-router-dom"

export const RightSidebar = ({post}) => {
    return (
        <div className="flex items-center p-2 pt-3 mb-4 rounded-lg shadow border">
            <Link className="flex items-center" to="/">
                <img loading="lazy" src={post.profileImg} alt={post.username}
                    className="w-10 h-10 mr-4 border object-cover object-top rounded-full flex-shrink-0 bg-gray-200" />
                <div className="text-sm flex flex-col content-start items-start  sm:text-base font-semibold">
                    <span>{post.firstName} {post.lastName}</span>
                    <span className="hidden sm:inline text-gray-500 text-sm font-normal">@{post.username}</span>
                </div>
            </Link>
            <button className="ml-auto">
                <span className="ml-auto text-blue-500 p-2 rounded-full hover:bg-blue-100">Follow</span>
            </button>
        </div>
    )
}