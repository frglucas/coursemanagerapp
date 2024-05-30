import { api } from "../api"

export const useGetClassById = () => {

    const getClassById = async (id: string) => {
        const response = await api.get('classes', { params: { id: id } })

        return response
    }

    return ({
        call: getClassById
    })
}