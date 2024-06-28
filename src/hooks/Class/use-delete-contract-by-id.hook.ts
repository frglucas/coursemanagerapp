import { api } from "../api"

export const useDeleteContractById = () => {

    const deleteContractById = async (contractId: string, classId: string) => {
        const response = await api.delete('classes/remove-client', { params: { contractId: contractId, classId: classId } })

        return response
    }

    return ({
        call: deleteContractById
    })
}