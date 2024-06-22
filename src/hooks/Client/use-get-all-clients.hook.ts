import { api } from "../api"

export const useGetAllClients = () => {

    const getAllClients = async (term: string = '') => {
        const response = await api.get('clients/all')

        return response
    }

    return ({
        call: getAllClients
    })
}