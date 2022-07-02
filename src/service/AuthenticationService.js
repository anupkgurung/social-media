import axios from "axios";

export const _get = async(url,errorHandler,custErrMsg) => {
    axios.defaults.headers.common["authorization"] = localStorage.getItem("login-token")
    return axios.get(url)
    // .catch(error=>{
    //     return errorHandler(error)
    // })
}

export const _post = (url,params,errorHandler,custErrMsg) => {
    axios.defaults.headers.common["authorization"] = localStorage.getItem("login-token")
    return axios.post(url,params)
    // .catch(error=>{
    //     return errorHandler(error)
    // })    
}

export const _doPost = (url,errorHandler,custErrMsg) => {
    axios.defaults.headers.common["authorization"] = localStorage.getItem("login-token")
    return axios.post(url)
    // .catch(error=>{
    //     return errorHandler(error)
    // })  
}

export const _delete = (url,errorHandler,custErrMsg) => {
    axios.defaults.headers.common["authorization"] = localStorage.getItem("login-token")
    return axios.delete(url)
    // .catch(error=>{
    //     return errorHandler(error)
    // })    
}