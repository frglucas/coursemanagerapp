import { FormAddInstallment } from "../../models"
import { api } from "../api"

export const usePostAddInstallment = () => {

    const postAddInstallment = async (data: FormAddInstallment) => {
        const response = await api.post('payment/add-installment', data)

        return response
    }

    return ({
        call: postAddInstallment
    })
}