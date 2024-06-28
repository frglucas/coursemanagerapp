import { ChangeEvent, useEffect, useState } from "react"
import { Contract, FormAddInstallment } from "../../models/Contract/Contract.model"
import { useGetContractById, usePostAddInstallment, usePutPayInstallment, useRemoveInstallment } from "../../hooks"
import classNames from "classnames"
import { ReadOnly } from "../ReadOnly/ReadOnly.component";
import { BasicTable } from "../BasicTable/BasicTable.component";
import { BASIC_TABLE_HEADERS, FORM_ADD_PAYMENT } from "../../constants";
import { BasicTableValue } from "../../models";
import { format } from "date-fns";
import { MoneyToNumber, NumberToMoney } from "../../utils/StringUtils";
import { Button } from "../Button/Button.component";
import { CalendarPicker } from "../CalendarPicker/CalendarPicker.component";
import { Select } from "../Select/Select.component";
import { CurrencyInput } from "../CurrencyInput/CurrencyInput.component";
import { toast } from "react-toastify";

import './FormAddPayment.style.scss';

type Props = {
    contractId: string
}

export const FormAddPayment = ({ contractId }: Props) => {
    const [contract, setContract] = useState<Contract>({} as Contract)
    const [showAddForm, setShowAddForm] = useState<boolean>(false)

    const [money, setMoney] = useState<string>('')
    const [dueDate, setDueDate] = useState<Date>(new Date())
    const [paymentMethod, setPaymentMethod] = useState<string>('none')

    const { call: callGetContractById } = useGetContractById()
    const { call: callPostAddInstallment } = usePostAddInstallment()
    const { call: callPutPayInstallment } = usePutPayInstallment()
    const { call: callRemoveInstallment } = useRemoveInstallment()

    const getContract = async () => {
        try {
            const { data } = await callGetContractById(contractId)

            setContract(data.data)
        } catch { }
    }

    useEffect(() => {
        getContract()
    }, [])

    const getInstallments = () => (contract.payment?.installments?.length > 0) ? contract.payment.installments : []

    const getPayments = (): Array<BasicTableValue> => {
        return getInstallments().map(({ id, money, dueDate, paymentMethod, paymentStatus }) => ({
            fields: [
                NumberToMoney(money), 
                format(dueDate, 'dd/MM/yyyy'), 
                FORM_ADD_PAYMENT.PAYMENT_METHOD.VALUES.find(x => x.value === `${paymentMethod}`)?.label ?? '', 
                FORM_ADD_PAYMENT.PAYMENT_STATUS.VALUES.find(x => x.value === `${paymentStatus}`)?.label ?? ''
            ],
            actions: {
                canView: false,
                canEdit: false,
                canRemove: `${paymentStatus}` !== '2',
                canAccept: `${paymentStatus}` !== '2',
                onView: () => null,
                onEdit: () => null,
                onRemove: () => removeInstallment(contract.payment.id, id),
                onAccept: () => payInstallment(contract.payment.id, id),
                canRenderView: false,
                canRenderEdit: false,
                canRenderRemove: true,
                canRenderAccept: true,
            }
        }))
    }

    const addInstallment = async () => {
        const formData : FormAddInstallment = {
            contractId: contractId,
            dueDate: dueDate,
            money: MoneyToNumber(money.replace('.', '').replace(',', '.')),
            paymentMethod: (paymentMethod === 'none') ? 0 : parseInt(paymentMethod) 
        }

        try {
            const { data } = await callPostAddInstallment(formData)

            toast.success(data.message)
            setMoney('')
            setDueDate(new Date())
            setPaymentMethod('none')
            await getContract()
        } catch { }
    }
    
    const payInstallment = async (paymentId: string, installmentId: string) => {
        try {
            const { data } = await callPutPayInstallment(paymentId, installmentId)

            toast.success(data.message)
            await getContract()
        } catch { }
    }
    
    const removeInstallment = async (paymentId: string, installmentId: string) => {
        try {
            const { data } = await callRemoveInstallment(paymentId, installmentId)

            toast.success(data.message)
            await getContract()
        } catch { }
    }

    const renderHeader = () => (
        <div className={'form-add-payment__container__header'}>
            <ReadOnly label="Nome" value={contract.clientName} classname="form-add-payment__container__header__label" />
            <ReadOnly label="Email" value={contract.clientEmail}  classname="form-add-payment__container__header__label" />
        </div>
    )

    const handleChangeMoney = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setMoney(event.target.value)
    }

    const handleChangeDueDate = (event: ChangeEvent<HTMLInputElement>) => setDueDate(new Date(event.target.value))

    const handleChangePaymentMethod = (event: ChangeEvent<HTMLSelectElement>) => setPaymentMethod(event.target.value)

    const renderAddForm = () => !showAddForm ? (
        <div className="form-add-payment__container__button-add">
            <Button
                name="Adicionar pagamento"
                onClick={() => setShowAddForm(true)}
            />
        </div>
    ) : (
        <div className="form-add-payment__container__form-add" >
            <form action="none" className="form-add-payment__container__form-add__form" >
                <CurrencyInput label="Valor (R$)" value={money} onChange={handleChangeMoney} classname="form-add-payment__container__form-add__form__input"  />
                <CalendarPicker label="Data de vencimento" value={dueDate} onChange={handleChangeDueDate} classname="form-add-payment__container__form-add__form__input" />
                <Select label="Método de pagamento" options={FORM_ADD_PAYMENT.PAYMENT_METHOD.VALUES} value={paymentMethod} onChange={handleChangePaymentMethod} classname="form-add-payment__container__form-add__form__input" />
            </form>
            <Button name="Adicionar" onClick={addInstallment} />
        </div>
    )

    const renderPayments = () => (
        <BasicTable 
            headerValues={BASIC_TABLE_HEADERS.PAYMENT}
            bodyValues={getPayments()}
        />
    )

    return (
        <div className={classNames('form-add-payment__container')}>
            { renderHeader() }
            { renderAddForm() }
            { renderPayments() }
        </div>
    )
}