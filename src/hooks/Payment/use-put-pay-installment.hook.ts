import { api } from "../api"

export const usePutPayInstallment = () => {

    const putPayInstallment = async (paymentId: string, installmentId: string) => {
        const response = await api.put('payment/pay-installment', { paymentId: paymentId, installmentId: installmentId })

        return response
    }

    return ({
        call: putPayInstallment
    })
}