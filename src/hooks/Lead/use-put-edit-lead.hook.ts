import { EditLeadForm } from "../../models"
import { api } from "../api"

export const usePutEditLead = () => {

    const putEditLead = async (data: EditLeadForm) => {
        const response = await api.put('leads', data)

        return response
    }

    return ({
        call: putEditLead
    })
}