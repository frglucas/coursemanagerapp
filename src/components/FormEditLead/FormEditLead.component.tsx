import { ChangeEvent, useEffect, useState } from 'react';
import { FORM_ADD_CLIENT, PATH_ROUTES } from '../../constants';
import { Button } from '../Button/Button.component';
import { Input } from '../Input/Input.component';
import { Select } from '../Select/Select.component';
import { Textarea } from '../Textarea/Textarea.component';
import './FormEditLead.style.scss';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { EditLeadForm, SelectOption } from '../../models';
import { useGetLeadById, usePutEditLead } from '../../hooks';

type Props = {
    id: string
}

export const FormEditLead = ({ id }: Props) => {
    const navigate = useNavigate()

    const [leadId, setLeadId] = useState<string>(id)
    const [fullName, setFullName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [observation, setObservation] = useState<string>('')
    const [areaCode, setAreaCode] = useState<string>(FORM_ADD_CLIENT.SELECT_AREA_CODE.DEFAULT)
    const [phoneNumber, setPhoneNumber] = useState<string>('')

    const [allAreaCodes, ] = useState<Array<SelectOption>>(FORM_ADD_CLIENT.SELECT_AREA_CODE.VALUES)

    const { call: callGetLead } = useGetLeadById()
    const { call: callPutEditLead } = usePutEditLead()

    const getLead = async () => {
        try {
            const { data: { data } } = await callGetLead(id)
            
            setLeadId(data.id)
            setFullName(data.name)
            setEmail(data.email)
            setObservation(data.observation)
            setAreaCode((data.areaCode === '' || data.areaCode === null) ? 'none' : data.areaCode)
            setPhoneNumber(data.phoneNumber)
        } catch { }
    }

    useEffect(() => {
        getLead()
    }, [])

    const putEditLead = async () => {
        const form : EditLeadForm = {
            leadId: leadId,
            fullName: fullName,
            email: email,
            areaCode: (areaCode === 'none') ? '' : areaCode,
            phoneNumber: phoneNumber,
            observation: observation
        }

        try {
            const { data } = await callPutEditLead(form)
            toast.success(data.message)
            navigate(PATH_ROUTES.PRIVATE.SEARCH_LEADS)
        } catch { }
    }

    const handleChangeFullName = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setFullName(event.target.value)
    }
    
    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setEmail(event.target.value)
    }

    const handleChangeObservation = (event: ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault()
        setObservation(event.target.value)
    }

    const handleChangeAreaCode = (event: ChangeEvent<HTMLSelectElement>) => setAreaCode(event.target.value)

    const handleChangePhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setPhoneNumber(event.target.value)
    }

    return (
        <form action="none" className="form-add-lead__container">
            <Input value={fullName} label="Nome" onChange={handleChangeFullName}/>
            <Input value={email} label="Email" onChange={handleChangeEmail} />
            <div className='form-add-lead__container__phone-number'>
                <Select label='DDD' value={areaCode} options={allAreaCodes} onChange={handleChangeAreaCode} classname='form-add-lead__container__phone-number__area-code'/>
                <Input value={phoneNumber} label="Número de celular" onChange={handleChangePhoneNumber} classname='form-add-lead__container__phone-number__number' />
            </div>
            <Textarea value={observation} label="Observação" maxLength={512} onChange={handleChangeObservation} />
            <div className="form-add-lead__container__buttons">
                <Button name="Salvar" onClick={putEditLead} classname="form-add-lead__container__buttons__save" />
                <Button name="Cancelar" onClick={() => navigate(PATH_ROUTES.PRIVATE.SEARCH_LEADS)} classname="form-add-lead__container__buttons__cancel" />
            </div>
        </form>
    )
};