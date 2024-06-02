import { RegisterForm } from "../../models"
import { api } from "../api"

export const usePostRegister = () => {

    const postRegister = async (data: RegisterForm) => {
        const response = await api.post('users', data)

        return response
    }

    return ({
        call: postRegister
    })
}