import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../../component";
import { useAuth, userSignup } from "./authSlice";
import {toast} from  "react-toastify"

export const Signup = () => {

    const {isLogin} = useAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const initialSingupData = {
        firstName : null,
        lastName : null,
        username:null,
        password : null
    }
    const [credentials, setCredentials] = useState(initialSingupData);

    const changeHandler = (e) => {
        setCredentials(credentials => ({
            ...credentials,
            [e.target.id] : e.target.value
        }))
    }
    
    const signup = (e) => {
        e.preventDefault()
        dispatch(userSignup(credentials)).unwrap()
            .then(()=>toast.success("Signup Successfull"))
            .catch((error)=>{
                toast.error(error)
            })
    }

    useEffect(()=>{
        isLogin && navigate("/",{replace:true})
    },[isLogin,navigate])

    return (
        <div className="flex justify-center pt-20">
        <div className="p-6 rounded-lg shadow-lg bg-white max-w-md">
            <form>
                <div className="grid grid-cols-2 gap-4">
                    <div className="form-group mb-6">
                        <Input type={"text"}
                            eleId={"firstName"}
                            placeHolder={"First name"}
                            value={initialSingupData.firstName} 
                            onChangeHandler={changeHandler}/>
                    </div>
                    <div className="form-group mb-6">
                        <Input type={"text"}
                            eleId={"lastName"}
                            placeHolder={"Last name"} 
                            value={initialSingupData.lastName} 
                            onChangeHandler={changeHandler}/>
                    </div>
                </div>
                <div className="form-group mb-6">
                    <Input type={"text"}
                        eleId={'username'}
                        placeHolder={"Enter username"}
                        value={initialSingupData.username}
                        onChangeHandler={changeHandler}
                    />
                </div>
                <div className="form-group mb-6">
                    <Input type={showPassword ? "text" : "password"}
                        eleId={'password'}
                        placeHolder={"Password"}
                        value={initialSingupData.password}
                        onChangeHandler={changeHandler}
                    />
                </div>
                <div className="form-group form-check flex mb-6">
                    <Input type={"checkbox"}
                        eleId={"showPassword"}
                        onChangeHandler={()=>setShowPassword(showPassword => !showPassword)}
                    />
                    <label className="form-check-label inline-block text-gray-800" htmlFor="showPassword">Show Password</label>
                </div>
                <Button caption={"Sign Up"} clickHandler={signup} />
            </form>
        </div>
        </div>
    )
}