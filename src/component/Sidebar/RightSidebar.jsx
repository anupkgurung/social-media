import { Link } from "react-router-dom"

export const RightSidebar = () => {
    return (
        <aside className="py-2 px-4 lg:block lg:right-aside border-b border-t sticky h-max md:mt-[6.2rem] md:top-[6.2rem] w-full">
            <h4 className="font-semibold my-4 text-center">Suggestions</h4>
            <div className="flex items-center p-2 pt-3 mb-4 rounded-lg shadow border ">
                <Link className="flex items-center" to="/">
                    <img loading="lazy" src="https://raw.githubusercontent.com/anupkgurung/images/main/social/ayush.jpg" alt="dan-abramov"
                        className="w-10 h-10 mr-4 border object-cover object-top rounded-full flex-shrink-0 bg-gray-200" />
                    <div className="text-sm flex flex-col sm:text-base font-semibold">
                        <span>Ayush Gurung</span>
                        <span className="hidden sm:inline text-gray-500 text-sm font-normal">@ayushgurung</span>
                    </div>
                </Link>
                <button data-tooltip="Follow" className="tooltip ml-auto">
                    <span className="material-icons-round ml-auto text-blue-500 p-2 rounded-full hover:bg-blue-100">add</span>
                </button></div>
        </aside>
    )
}