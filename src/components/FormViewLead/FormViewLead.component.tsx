import { useEffect, useState } from 'react';
import { ReadOnly } from '../ReadOnly/ReadOnly.component';
import { Textarea } from '../Textarea/Textarea.component';
import './FormViewLead.style.scss';
import { useNavigate } from 'react-router-dom';
import { useGetLeadById } from '../../hooks';
import { Button } from '../Button/Button.component';
import { PATH_ROUTES } from '../../constants';

type Props = {
    id: string
}

export const FormViewLead = ({ id }: Props) => {
    const navigate = useNavigate()

    const [leadId, setLeadId] = useState<string>(id)
    const [fullName, setFullName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [observation, setObservation] = useState<string>('')
    const [areaCode, setAreaCode] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [creatorName, setCreatorName] = useState<string>('')

    const { call: callGetLead } = useGetLeadById()

    const getLead = async () => {
        try {
            const { data: { data } } = await callGetLead(id)
            
            setLeadId(data.id)
            setFullName(data.name)
            setEmail(data.email)
            setAreaCode(data.areaCode)
            setPhoneNumber(data.phoneNumber)
            setObservation(data.observation)
            setCreatorName(data.creatorName)
        } catch { }
    }

    useEffect(() => {
        getLead()
    }, [])

    return (
        <form action="none" className="form-view-lead__container">
            <ReadOnly value={fullName} label="Nome" />
            <ReadOnly value={email} label="Email" />
            <div className='form-view-lead__container__phone-number'>
                <ReadOnly label='DDD' value={areaCode} classname='form-view-lead__container__phone-number__area-code'/>
                <ReadOnly value={phoneNumber} label="Número de celular" classname='form-view-lead__container__phone-number__number'/>
            </div>
            <ReadOnly value={observation} label="Observação" />
            <ReadOnly value={creatorName} label="Criador" />
            <div className='form-view-lead__container__buttons'>
                <Button name='Editar' onClick={() => navigate(PATH_ROUTES.PRIVATE.EDIT_LEADS.replace(':id', leadId))} classname='form-view-lead__container__buttons__edit' />
                <Button name='Voltar' onClick={() => navigate(PATH_ROUTES.PRIVATE.SEARCH_LEADS)} classname='form-view-lead__container__buttons__back' />
            </div>
        </form>
    )
};