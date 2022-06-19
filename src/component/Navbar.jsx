import { NavLink } from "react-router-dom";

export const Navbar = () => {
    let activeStyle = {
        textDecoration : "underline"
    }
    return (
        <>
            <NavLink className='text-4xl m-4' to="/home" style={({isActive})=>isActive ? activeStyle : undefined} >Home</NavLink>
        </>
    )
}