import { api } from "../api"

export const useDeleteClient = () => {

    const deleteClient = async (id: string) => {
        const response = await api.delete(`clients/${id}`)

        return response
    }

    return ({
        call: deleteClient
    })
}