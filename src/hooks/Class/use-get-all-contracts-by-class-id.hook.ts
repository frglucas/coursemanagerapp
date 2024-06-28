import { api } from "../api"

export const useGetAllContractsByClassId = () => {

    const getAllContractsByClassId = async (id: string) => {
        const response = await api.get('classes/contracts', { params: { classId: id } })

        return response
    }

    return ({
        call: getAllContractsByClassId
    })
}