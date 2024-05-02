import { api } from "../api"
import { useUser } from "../../contexts/use-context/useUser"

export const useGetUser = () => {
    const { saveUser } = useUser()

    const getUser = async () => {
        const response = await api.post('user')

        saveUser(response.data.data)

        return response
    }

    return ({
        call: getUser
    })
}