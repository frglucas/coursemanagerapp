import { api } from "../api"

export const usePostAddClientInClass = () => {

    const postAddClientInClass = async (clientId: string, classId: string) => {
        const response = await api.post('classes/add-client', { clientId: clientId, classId: classId })

        return response
    }

    return ({
        call: postAddClientInClass
    })
}