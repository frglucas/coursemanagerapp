import { useContext } from "react"
import { UserContext } from "../../models/User/User.model"
import { LoggedInUserContext } from "../LoggedInUser.context"

export const useUser = () => {
    const ERROR_MESSAGE =
        '"LoggedInUserContext" should be used with "LoggedInUserProvider"'

    const context = useContext<UserContext>(LoggedInUserContext)

    if (!context) throw new Error(ERROR_MESSAGE)

    return context
}
