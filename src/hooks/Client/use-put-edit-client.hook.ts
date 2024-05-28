import { EditClientForm } from "../../models"
import { api } from "../api"

export const usePutEditClient = () => {

    const putEditClient = async (data: EditClientForm) => {
        const response = await api.put('clients', data)

        return response
    }

    return ({
        call: putEditClient
    })
}