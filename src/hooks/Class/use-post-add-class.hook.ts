import { AddClassForm } from "../../models"
import { api } from "../api"

export const usePostAddClass = () => {

    const postAddClass = async (data: AddClassForm) => {
        const response = await api.post('classes', data)

        return response
    }

    return ({
        call: postAddClass
    })
}