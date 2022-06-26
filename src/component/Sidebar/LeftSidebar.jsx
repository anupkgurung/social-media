import { NavLink, Link } from "react-router-dom"

export const LeftSidebar = () => {
    let activeStyle = {
        borderBottom : "2px solid #0000ff80",
        borderRadius : "5px"
    }

    return (
        <div className="sticky bottom-0 left-0 right-0 z-[2] md:top-[6.2rem] md:left-aside md:ml-auto md:w-[16rem] md:py-2 md:h-[33rem] bg-white ">
            <ul className="w-full md:block gap-1">
                <li className="md:mb-1 md:mx-2">
                    <NavLink className="p-3 md:py-2 md:px-4 flex flex-col text-xs md:text-base md:flex-row justify-center md:justify-start items-center " 
                        to={"/"}
                        style={({isActive})=> isActive ? activeStyle : undefined}>
                        <div className="flex items-center">
                            <div>
                                <span className={`${false ? 'material-icons-round' : 'material-icons-outlined'} text-2xl md:mr-3 md:text-3xl`}>home</span>
                            </div>
                            <div className="pb-2 sm:block">Home</div>
                        </div>
                    </NavLink>
                </li>

                <li className="md:mb-1 md:mx-2">
                    <NavLink className="p-3 md:py-2 md:px-4 flex flex-col text-xs md:text-base md:flex-row justify-center md:justify-start items-center" 
                        to={"/explore"}
                        style={({isActive})=> isActive ? activeStyle : undefined}>
                        <div className="flex items-center">
                            <div>
                            <span className={`${true ? 'material-icons-round' : 'material-icons-outlined'} text-2xl md:mr-3 md:text-3xl`}>tag</span>
                            </div>
                            <div className="pb-2 sm:block">Explore</div>
                        </div>
                    </NavLink>  
                </li>

                <li className=" md:mb-1 md:mx-2">
                    <NavLink className=" p-3 md:py-2 md:px-4 flex flex-col text-xs md:text-base md:flex-row justify-center md:justify-start items-center " 
                        to={"/bookmark"}
                        style={({isActive})=> isActive ? activeStyle : undefined}>
                        <div className="flex items-center">
                            <div>
                                <span className={`${true ? 'material-icons-round' : 'material-icons-outlined'} text-2xl md:mr-3 md:text-3xl`}>bookmarks</span>
                            </div>
                            <div className="pb-2 sm:block">Bookmark</div>
                        </div>
                    </NavLink>  
                </li>

                <li className=" md:mb-1 md:mx-2">
                    <NavLink className="p-3 md:py-2 md:px-4 flex flex-col text-xs md:text-base md:flex-row justify-center md:justify-start items-center" 
                        to={"/profile"}
                        style={({isActive})=> isActive ? activeStyle : undefined}>
                        <div className="flex items-center">
                            <div>
                                <span className={`${true ? 'material-icons-round' : 'material-icons-outlined'} text-2xl md:mr-3 md:text-3xl`}>person</span>
                                
                            </div>
                            <div className="pb-2 sm:block">Profile</div>
                        </div>
                    </NavLink>  
                </li>
                
                <li className="mt-36 md:block mx-2">
                    <Link to="/login">
                        <button className="w-full flex items-center justify-center py-2 px-4 border rounded border-blue-400 text-blue-500 text-sm">
                            <span class="material-icons pr-2">logout</span>
                                Logout
                        </button>
                    </Link>
                  
                </li>           
            </ul>
        </div>
    )
}