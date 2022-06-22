import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/Authentication/authSlice";

export const Navigate = (path) => {
    const navigate = useNavigate()
    const {isLogin} =useAuth()
    isLogin ? navigate(path ?? "/", {replace:true}) : navigate("/login")
}
