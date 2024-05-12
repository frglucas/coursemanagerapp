import { useContext } from "react"
import { AuthDataContext } from "../../models/Auth/Auth.model"
import { AuthContext } from "../Auth.context"

export const useAuth = () => {
    const ERROR_MESSAGE = '"AuthContext" should be used with "AuthProvider"'

    const context = useContext<AuthDataContext>(AuthContext)

    if (!context) throw new Error(ERROR_MESSAGE)

    return context
}
