import { AddLeadForm } from "../../models"
import { api } from "../api"

export const usePostAddLead = () => {

    const postAddLead = async (data: AddLeadForm) => {
        const response = await api.post('leads', data)

        return response
    }

    return ({
        call: postAddLead
    })
}