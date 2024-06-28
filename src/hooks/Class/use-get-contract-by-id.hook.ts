import { api } from "../api"

export const useGetContractById = () => {

    const getContractById = async (id: string) => {
        const response = await api.get('classes/contract', { params: { id: id } })

        return response
    }

    return ({
        call: getContractById
    })
}