import { useEffect, useState } from 'react';
import './FormViewClient.style.scss';
import { FORM_ADD_CLIENT, PATH_ROUTES } from '../../constants';
import { SelectOption } from '../../models';
import { useDeleteClient, useGetAllOccupations, useGetClientById } from '../../hooks';
import { Occupation } from '../../models/Occupation/Occupation.models';
import classNames from 'classnames';
import { ReadOnly } from '../ReadOnly/ReadOnly.component';
import { format } from 'date-fns';
import { Button } from '../Button/Button.component';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type Props = {
    id: string
}

export const FormViewClient = ({ id }: Props) => {
    const navigate = useNavigate()

    const [clientId, setClientId] = useState<string>(id)
    const [fullName, setFullName] = useState<string>('')
    const [badgeName, setBadgeName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [document, setDocument] = useState<string>('')
    const [documentType, setDocumentType] = useState<string>(FORM_ADD_CLIENT.RADIO_DOCUMENT_TYPE.DEFAULT)
    const [birthDate, setBirthDate] = useState<Date>(new Date())
    const [gender, setGender] = useState<string>('none')
    const [genderDetail, setGenderDetail] = useState<string>('')
    const [occupation, setOccupation] = useState<string>('none')
    const [isSmoker, setIsSmoker] = useState<string>(FORM_ADD_CLIENT.RADIO_IS_SMOKER.DEFAULT)
    const [isActive, setIsActive] = useState<boolean>(false)

    const [allOccupations, setAllOccupations] = useState<Array<SelectOption>>([])
    const [allGenders, setAllGenders] = useState<Array<SelectOption>>([])

    const { call: callGetAllOccupations } = useGetAllOccupations()
    const { call: callGetClient } = useGetClientById()
    const { call: callDeleteClient } = useDeleteClient()

    const getAllOccupations = async () => {
        var { data } = await callGetAllOccupations()

        var occupations : Array<Occupation> = data.data

        var values : Array<SelectOption> = occupations.map(x => ({ value: x.id, label: x.description }))

        setAllOccupations(values)
    }
    
    const getAllGenders = () => {
        var values : Array<SelectOption> = FORM_ADD_CLIENT.SELECT_GENDER.VALUES

        setAllGenders(values)
    }

    const getClient = async () => {
        try {
            const { data: { data } } = await callGetClient(id)
            
            setClientId(data.id)
            setFullName(data.fullName)
            setBadgeName(data.badgeName)
            setEmail(data.email)
            setBirthDate(data.birthDate)
            setDocumentType(`${data.documentType}`)
            setDocument(data.document)
            setOccupation(data.occupationId)
            setGender(`${data.genderType}`)
            setGenderDetail(data.genderDetails)
            setIsSmoker(`${data.isSmoker}`)
            setIsActive(data.isActive)
        } catch { }
    }

    useEffect(() => {
        getAllOccupations()
        getAllGenders()
        getClient()
    }, [])

    const deleteClient = async () => {
        
        const { data } = await callDeleteClient(clientId)

        toast.success(data.message)
        getClient()
    }

    return (
        <div className={classNames('form-view-client__container')}>
            <div className="form-view-client__container__name-content">
                <ReadOnly value={fullName} label='Nome' />
                <ReadOnly value={badgeName} label='Nome no crachá' />
            </div>
            <ReadOnly value={email} label='Email' />
            <div className="form-view-client__container__sides">
                <div className="form-view-client__container__sides__left">
                    <ReadOnly value={format(birthDate, 'dd/MM/yyyy')} label='Data de nascimento' />
                    <ReadOnly value={allOccupations.find(x => x.value === occupation)?.label ?? ''} label='Profissão' />
                    <ReadOnly value={allGenders.find(x => x.value === gender)?.label ?? ''} label='Gênero' />
                    { (gender === '3') &&  <ReadOnly value={genderDetail} label='Especifique' /> }
                    <ReadOnly value={isActive ? 'Sim' : 'Não'} label='Ativo' />
                </div>
                <div className="form-view-client__container__sides__right">
                    <ReadOnly value={FORM_ADD_CLIENT.RADIO_DOCUMENT_TYPE.VALUES.find(x => x.value === documentType)?.label ?? ''} label='Tipo de Documento' />
                    <ReadOnly value={document} label='Documento' />
                    <ReadOnly value={FORM_ADD_CLIENT.RADIO_IS_SMOKER.VALUES.find(x => x.value === isSmoker)?.label ?? ''} label='Fumante' />
                </div>
            </div>
            <div className='form-view-client__container__buttons'>
                <Button name='Editar' disabled={!isActive} onClick={() => navigate(PATH_ROUTES.EDIT_CLIENTS.replace(':id', clientId))} classname='form-view-client__container__buttons__edit' />
                <Button name='Inativar' disabled={!isActive} onClick={deleteClient} classname='form-view-client__container__buttons__remove' />
                <Button name='Voltar' onClick={() => navigate(PATH_ROUTES.SEARCH_CLIENTS)} classname='form-view-client__container__buttons__back' />
            </div>
        </div>
    )
}