import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../contexts"
import { PATH_ROUTES } from "../constants"
import { api } from "../hooks"

export const Private = () => {
    const { token } = useAuth()
    
    if (!token)
        return <Navigate to={PATH_ROUTES.PUBLIC.LOGIN} />

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    return ( <Outlet /> )
}