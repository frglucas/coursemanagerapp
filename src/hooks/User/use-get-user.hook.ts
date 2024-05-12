import { api } from "../api"

export const useGetUser = () => {
    
    const getUser = async () => {
        const response = await api.get('user')

        return response
    }

    return ({
        call: getUser
    })
}