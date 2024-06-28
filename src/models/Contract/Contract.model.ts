export type Contract = {
    id: string,
    clientId: string,
    clientName: string,
    clientEmail: string,
    payment: Payment
}

export type Payment = {
    id: string,
    installments: Array<Installment>
}

export type Installment = {
    id: string,
    money: number,
    paymentStatus: number,
    paymentMethod: number,
    dueDate: Date
}

export type FormAddInstallment = {
    contractId: string,
    money: number,
    paymentMethod: number,
    dueDate: Date
}