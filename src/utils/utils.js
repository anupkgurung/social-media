export const changeHandler = (e,setCredentials) => {
    setCredentials(credentials => ({
        ...credentials,
        [e.target.id] : e.target.value
    }))
}
