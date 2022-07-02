import { Link, useNavigate } from "react-router-dom"
import {useState} from "react"
import { Button, Input } from "../../component";
import { useDispatch } from "react-redux";
import { useAuth, userLogin } from "./authSlice";
import { useEffect } from "react";
import {toast} from "react-toastify";
import { useDocumentTitle } from "../../customhook/useDocumentTitle";


export const Login = () => {

    useDocumentTitle("Login")
    const dispatch = useDispatch()
    const {isLogin} = useAuth()
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ username:null,password : null});
    const changeHandler = (e) => {
        setCredentials(credentials => ({
            ...credentials,
            [e.target.id] : e.target.value
        }))
    }

    const handleLogin = (e)=>{
        e.preventDefault()
        dispatch(userLogin(credentials)).unwrap().then(
            ()=>toast.success("Login Successfull")
        ).catch((error)=>{
            toast.error(error)
        })
    }
    const handleTestLogin = (e) => {
        e.preventDefault()
        setCredentials({username:'anupkmr',password:'akg123'})
    }
    useEffect(()=>{
        isLogin && navigate("/",{replace:true})
    },[isLogin,navigate])

    return (
        <div className="flex justify-center pt-20">
            <div className="p-6 rounded-lg shadow-lg bg-white max-w-sm w-96">
                <form>
                    <div className="form-group mb-6">
                        <label htmlFor="email" className="form-label flex mb-2 text-gray-700">Email address</label>
                        <Input type={"text"}
                            eleId={'username'}
                            placeHolder={"Enter email"}
                            value={credentials.username}
                            onChangeHandler={changeHandler}
                        />                      
                    </div>
                    <div className="form-group mb-6">
                        <label htmlFor="password" className="form-label flex mb-2 text-gray-700">Password</label>
                        <Input type={"password"}
                            eleId={'password'}
                            placeHolder={"Password"}
                            value={credentials.password}
                            onChangeHandler={changeHandler}
                        />
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <div className="form-group form-check">
                           <Input type={"checkbox"}
                            eleId={"rememberMe"}
                           />
                            <label className="form-check-label inline-block text-gray-800" htmlFor="rememberMe">Remember me</label>
                        </div>
                        <Link to={"/login"}
                            className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">Forgot
                            password?
                        </Link>
                    </div>
                    <Button caption={"Sign in"}
                     clickHandler={handleLogin}/>
                    <Button caption={"Use Test User"}
                     clickHandler={handleTestLogin}/>

                    <p className="text-gray-800 mt-6 text-center">Not a member? 
                        <Link to={"/signup"} className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}