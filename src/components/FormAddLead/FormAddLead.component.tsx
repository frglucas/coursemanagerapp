import { useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button.component';
import { Input } from '../Input/Input.component';
import './FormAddLead.style.scss';
import { FORM_ADD_CLIENT, PATH_ROUTES } from '../../constants';
import { ChangeEvent, useState } from 'react';
import { Textarea } from '../Textarea/Textarea.component';
import { Select } from '../Select/Select.component';
import { SelectOption } from '../../models';
import { usePostAddLead } from '../../hooks/Lead/use-post-add-lead.hook';
import { toast } from 'react-toastify';

export const FormAddLead = () => {
    const navigate = useNavigate()

    const [fullName, setFullName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [observation, setObservation] = useState<string>('')
    const [areaCode, setAreaCode] = useState<string>(FORM_ADD_CLIENT.SELECT_AREA_CODE.DEFAULT)
    const [phoneNumber, setPhoneNumber] = useState<string>('')

    const [allAreaCodes, ] = useState<Array<SelectOption>>(FORM_ADD_CLIENT.SELECT_AREA_CODE.VALUES)

    const { call: callPostAddLead } = usePostAddLead()

    const postAddClient = async () => {
        const form = {
            fullName: fullName,
            email: email,
            areaCode: areaCode,
            phoneNumber: phoneNumber,
            observation: observation
        }

        try {
            var { data } = await callPostAddLead(form)

            navigate(PATH_ROUTES.PRIVATE.SEARCH_LEADS)
            toast.success(data.message)
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
            <Input value={fullName} label="Nome" onChange={handleChangeFullName} placeholder="ex.: José Silva" />
            <Input value={email} label="Email" onChange={handleChangeEmail} placeholder="ex.: jose.silva@mail.com" />
            <div className='form-add-lead__container__phone-number'>
                <Select label='DDD' value={areaCode} options={allAreaCodes} onChange={handleChangeAreaCode} classname='form-add-lead__container__phone-number__area-code'/>
                <Input value={phoneNumber} label="Número de celular" onChange={handleChangePhoneNumber} placeholder="ex.: 98765-4321" classname='form-add-lead__container__phone-number__number' />
            </div>
            <Textarea value={observation} label="Observação" maxLength={512} onChange={handleChangeObservation} />
            <div className="form-add-lead__container__buttons">
                <Button name="Salvar" onClick={postAddClient} classname="form-add-lead__container__buttons__save" />
                <Button name="Cancelar" onClick={() => navigate(PATH_ROUTES.PRIVATE.SEARCH_LEADS)} classname="form-add-lead__container__buttons__cancel" />
            </div>
        </form>
    )
}