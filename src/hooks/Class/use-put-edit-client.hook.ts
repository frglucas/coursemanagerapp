import { EditClassForm } from "../../models"
import { api } from "../api"

export const usePutEditClass = () => {

    const putEditClass = async (data: EditClassForm) => {
        const response = await api.put('classes', data)

        return response
    }

    return ({
        call: putEditClass
    })
}