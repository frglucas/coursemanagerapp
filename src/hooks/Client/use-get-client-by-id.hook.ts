import { api } from "../api"

export const useGetClientById = () => {

    const getClientById = async (id: string) => {
        const response = await api.get('clients', { params: { id: id } })

        return response
    }

    return ({
        call: getClientById
    })
}