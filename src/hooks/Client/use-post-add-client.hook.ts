import { AddClientForm } from "../../models"
import { api } from "../api"

export const usePostAddClient = () => {

    const postAddClient = async (data: AddClientForm) => {
        const response = await api.post('clients', data)

        return response
    }

    return ({
        call: postAddClient
    })
}