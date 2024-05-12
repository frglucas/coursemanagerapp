import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../contexts"
import { PATH_ROUTES } from "../constants"
import { useEffect } from "react"
import { useGetUser } from "../hooks"

export const Private = () => {
    const { token } = useAuth()
    
    if (!token)
        return <Navigate to={PATH_ROUTES.LOGIN} />

    return ( <Outlet /> )
}