import { Navigate, Outlet, useLocation } from "react-router-dom"
import {useAuth} from "../../features"

export const Authenticate = () => {
   const {isLogin} = useAuth()
   const location = useLocation()
   return (
       <>
            {true ? <Outlet/> : <Navigate to="/login" state={{from:location}} replace />}
       </>
   )
}