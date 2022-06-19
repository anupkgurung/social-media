import { Button, Input } from "../../component"

export const Signup = () => {
    return (
        <div className="flex justify-center pt-20">
        <div className="p-6 rounded-lg shadow-lg bg-white max-w-md">
            <form>
                <div className="grid grid-cols-2 gap-4">
                    <div className="form-group mb-6">
                        <Input type={"text"}
                            eleId={"firstName"}
                            placeHolder={"First name"} />
                    </div>
                    <div className="form-group mb-6">
                        <Input type={"text"}
                            id={"lastName"}
                            placeHolder={"Last name"} />
                    </div>
                </div>
                <div className="form-group mb-6">
                    <Input type={"email"}
                        eleId={'email'}
                        placeHolder={"Enter email"}
                    />
                </div>
                <div className="form-group mb-6">
                    <Input type={"password"}
                        eleId={'password'}
                        placeHolder={"Password"}
                    />
                </div>
                <div className="form-group form-check flex mb-6">
                    <Input type={"checkbox"}
                        eleId={"showPassword"}
                    />
                    <label className="form-check-label inline-block text-gray-800" htmlFor="showPassword">Show Password</label>
                </div>
                <Button caption={"Sign Up"} />
            </form>
        </div>
        </div>
    )
}