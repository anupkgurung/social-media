import { Link, useNavigate } from "react-router-dom"
import { Button, Input } from "../../component";


export const Login = () => {

    return (
        <div className="flex justify-center pt-20">
            <div className="p-6 rounded-lg shadow-lg bg-white max-w-sm w-96">
                <form>
                    <div className="form-group mb-6">
                        <label htmlFor="email" className="form-label flex mb-2 text-gray-700">Email address</label>
                        <Input type={"email"}
                            eleId={'email'}
                            placeHolder={"Enter email"}
                        />                      
                    </div>
                    <div className="form-group mb-6">
                        <label htmlFor="password" className="form-label flex mb-2 text-gray-700">Password</label>
                        <Input type={"email"}
                            eleId={'password'}
                            placeHolder={"Password"}
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
                            password?</Link>
                    </div>
                    <Button caption={"Sign in"} />
                    <p className="text-gray-800 mt-6 text-center">Not a member? 
                        <Link to={"/signup"} className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}