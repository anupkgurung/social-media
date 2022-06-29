export const Comment = ({comment}) => {
    return (
        <div id="comment" className="flex flex-col border-t items-center justify-between p-4 mx-4">
            <div className="items-center w-full flex">
                <img src={comment.profileImg}
                    alt={comment.username} className="cursor-pointer w-9 h-9 md:w-9 md:h-9 mr-4 border object-cover object-top rounded-full bg-gray-100 hover:opacity-40" />
                <div className="items-center w-full flex bg-gray-200 rounded px-2">
                    <p className="w-full text-sm lg:text-base cursor-pointer text-justify">
                        text comment 2
                    </p>
                    <button className="m-1 px-1 py-0.5 rounded hover:bg-blue-400">
                        <span class="material-icons-outlined text-xl sm:text-[20px]">edit</span>
                    </button>
                    <button className="m-1 px-1 py-0.5 rounded hover:bg-blue-400 border-blue-400 text-sm">
                        <span class="material-icons-outlined text-xl sm:text-[20px]">delete</span>
                    </button>
                </div>
            </div>
        </div>
    )
}