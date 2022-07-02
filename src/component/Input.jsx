export const Input = ({type='',eleId='',placeHolder='',value="",onChangeHandler=()=>{}}) => {

    switch(type){
        case "email":
        case "password":
        case "text":
            return (
                <input type={type} className="form-control w-full px-3 py-1.5 
                                    text-base font-normal text-gray-700 bg-white bg-clip-padding 
                                    border border-solid border-gray-300 rounded m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 
                                    focus:outline-none" 
                                    id={eleId}
                                    placeholder={placeHolder} 
                                    value={value}
                                    onChange={onChangeHandler}/>
            )
        case "checkbox":
            return (
                <input type={type}  id={eleId} className="form-check-input appearance-none h-4 w-4 border 
                                            border-gray-300 rounded-sm bg-white
                                            checked:bg-blue-600 checked:border-blue-600 
                                            focus:outline-none transition duration-200 mt-1 
                                            align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                onChange={onChangeHandler}
                />
            )
        case "default":
            return (
                <input type="text" className="border border-blue-400 outline-blue-400" />
            )
    }
   
}