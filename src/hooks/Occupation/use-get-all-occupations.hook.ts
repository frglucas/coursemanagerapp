import { api } from "../api"

export const useGetAllOccupations = () => {

    const getAllOccupations = async (term: string = '') => {
        const response = await api.get('clients/occupations', { params: { term: term } })

        return response
    }

    return ({
        call: getAllOccupations
    })
}