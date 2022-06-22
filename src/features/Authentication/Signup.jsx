import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, Navigate } from "../../component";
import { loggedInUser, useAuth, userSignup } from "./authSlice";


export const Signup = () => {

    const {isLogin} = useAuth()
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const initialSingupData = {
        firstName : 'Yaku',
        lastName : "zona",
        username:"abc@gmail.com",
        password : '1234'
    }

    const signup = (e) => {
       
        e.preventDefault()
        dispatch(userSignup(initialSingupData))
        //Navigate(location)
       
    }

    useEffect(()=>{
        isLogin && navigate("/",{replace:true})
    })

    return (
        <div className="flex justify-center pt-20">
        <div className="p-6 rounded-lg shadow-lg bg-white max-w-md">
            <form>
                <div className="grid grid-cols-2 gap-4">
                    <div className="form-group mb-6">
                        <Input type={"text"}
                            eleId={"firstName"}
                            placeHolder={"First name"}
                            value={initialSingupData.firstName} />
                    </div>
                    <div className="form-group mb-6">
                        <Input type={"text"}
                            id={"lastName"}
                            placeHolder={"Last name"} 
                            value={initialSingupData.lastName} />
                    </div>
                </div>
                <div className="form-group mb-6">
                    <Input type={"email"}
                        eleId={'email'}
                        placeHolder={"Enter email"}
                        value={initialSingupData.username}
                    />
                </div>
                <div className="form-group mb-6">
                    <Input type={"password"}
                        eleId={'password'}
                        placeHolder={"Password"}
                        value={initialSingupData.password}
                    />
                </div>
                <div className="form-group form-check flex mb-6">
                    <Input type={"checkbox"}
                        eleId={"showPassword"}
                    />
                    <label className="form-check-label inline-block text-gray-800" htmlFor="showPassword">Show Password</label>
                </div>
                <Button caption={"Sign Up"} clickHandler={signup} />
            </form>
        </div>
        </div>
    )
}