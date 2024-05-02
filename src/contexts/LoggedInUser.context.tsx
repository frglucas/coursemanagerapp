import { ReactNode, createContext, useCallback, useMemo, useState } from "react";
import { api } from "../hooks/api";
import { useNavigate } from "react-router-dom";
import { User, UserContext } from "../models/User/User.model";

type Props = {
    children: ReactNode
}

export const LoggedInUserContext = createContext<UserContext>({} as UserContext)

export const LoggedInUserProvider = ({ children }: Props) => {
    const navigate = useNavigate()

    const [user, setUser] = useState<User>()
    
    const saveUser = (user: User) => setUser(user) 

    const signOut = useCallback(() => {
        api.defaults.headers.common['Authorization'] = null
        sessionStorage.removeItem('token')
        navigate('/login')
    }, [navigate])

    const value = useMemo(() => ({ user, saveUser, signOut }), [ user, signOut ])

    return (
        <LoggedInUserContext.Provider value={value}>
            { children }
        </LoggedInUserContext.Provider>
    )
}
