import { Link  } from "react-router-dom";
import { useAuth, useUser } from "../features";

export const Navbar = () => {
 
  const {userInfo} = useAuth()
  const {newProfileImg} = useUser()

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 w-full bg-white/60 border-b backdrop-blur-sm z-[3]">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center">
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link to={"/"} className="px-3 py-2 rounded-md text-blue-600 text-2xl font-medium">SOCIAL</Link>
                </div>
              </div>
            </div>
           {Object.keys(userInfo).length !== 0 && <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Profile dropdown  */}
              <div className="ml-3 relative ">
                <div>
                  <button type="button" className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" >
                    <span className="sr-only">Open user menu</span>
                    {!newProfileImg && <img className="h-8 w-8 rounded-full" src={userInfo?.profileImg} alt={userInfo?.username} />}
                    {newProfileImg && <img className="h-8 w-8 rounded-full" src={URL.createObjectURL(newProfileImg)} alt={userInfo?.username} />}
                  </button>
                </div>

                <div className="sm:hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" tabIndex="-1">
                  <Link to={"/"} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</Link>
                  <Link to={"/"} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Settings</Link>
                  <Link to={"/"} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</Link>
                </div>
              </div>
            </div>}
          </div>
        </div>
      </nav>
    </>
  )
}