import React, { useState, createContext, useEffect } from "react";
import { IUser } from "../interfaces/IUser";
import { IUserContext } from "../interfaces/IUserContext";

export const UserContext = createContext<IUserContext | null>(null)

const UserContextProvider = ({children}: any) => {
    const [user, setUser] = useState<IUser | null>(null)

    useEffect(() => {
        const userLocalStore = localStorage.getItem('user')
        
        if(userLocalStore){
            setUser(JSON.parse(userLocalStore))
        }
    }, [])

    const login = (userData: IUser, remeberMe?: boolean) => {
        
        setUser(userData)

        if(remeberMe){
            localStorage.setItem('user', JSON.stringify(userData))
        }
    }

    const logout = () => {
        localStorage.removeItem('user')
        setUser(null)
    }

    return(
        <UserContext.Provider value={{user, login, logout}} >
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider