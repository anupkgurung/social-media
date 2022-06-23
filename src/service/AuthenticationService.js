import axios from "axios";

export const _get = async(url,errorHandler,custErrMsg) => {
    return axios.get(url).catch(error=>{
        return errorHandler(error)
    })
}

export const _post = (url,params,errorHandler,custErrMsg) => {
    return axios.post(url,params).catch(error=>{
        return errorHandler(error)
    })    
}