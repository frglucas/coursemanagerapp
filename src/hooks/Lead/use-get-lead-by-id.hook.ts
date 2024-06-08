import { api } from "../api"

export const useGetLeadById = () => {

    const getLeadById = async (id: string) => {
        const response = await api.get('leads', { params: { id: id } })

        return response
    }

    return ({
        call: getLeadById
    })
}