import { LoginForm } from "../../models"
import { api } from "../api"

export const usePostLogin = () => {

    const postLogin = async (data: LoginForm) => {
        const response = await api.post('authenticate', data)

        return response
    }

    return ({
        call: postLogin
    })
}