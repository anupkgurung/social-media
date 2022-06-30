import { Navigate, Outlet, useLocation } from "react-router-dom"
import {useAuth} from "../../features"

export const Authenticate = () => {
   const {isLogin} = useAuth()
   const location = useLocation()
   return (
       <>
            {isLogin ? <Outlet/> : <Navigate to="/login" state={{from:location}} replace />}
       </>
   )
}