import { createContext, useContext, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [loggedUser, setLoggedUser] = useState(undefined)
    return (
        <AuthContext.Provider value={{loggedUser,setLoggedUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)