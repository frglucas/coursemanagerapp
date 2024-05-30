import { api } from "../api"

export const useGetAllUsers = () => {
    
    const getAllUsers = async () => {
        const response = await api.get('user/all')

        return response
    }

    return ({
        call: getAllUsers
    })
}