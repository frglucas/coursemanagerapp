import { api } from "../api"

export const useRemoveInstallment = () => {

    const RemoveInstallment = async (paymentId: string, installmentId: string) => {
        const response = await api.delete('payment/remove-installment', { params: { paymentId: paymentId, installmentId: installmentId } })

        return response
    }

    return ({
        call: RemoveInstallment
    })
}