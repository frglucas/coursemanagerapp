import { useEffect, useState } from 'react';
import './FormViewClient.style.scss';
import { FORM_ADD_CLIENT, PATH_ROUTES } from '../../constants';
import { ClientBasic, SelectOption, UserBasic } from '../../models';
import { useDeleteClient, useGetAllClients, useGetAllOccupations, useGetAllUsers, useGetClientById } from '../../hooks';
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
    const [creator, setCreator] = useState<string>('')
    const [captivator, setCaptivator] = useState<string>('')
    const [indicator, setIndicator] = useState<string>('')
    const [indicatorIsCaptivator, setIndicatorIsCaptivator] = useState<string>('')
    const [observation, setObservation] = useState<string>('')

    const [allOccupations, setAllOccupations] = useState<Array<SelectOption>>([])
    const [allGenders, setAllGenders] = useState<Array<SelectOption>>([])
    const [allUsers, setAllUsers] = useState<Array<SelectOption>>([])
    const [allIndicators, setAllIndicators] = useState<Array<SelectOption>>([])

    const { call: callGetAllOccupations } = useGetAllOccupations()
    const { call: callGetClient } = useGetClientById()
    const { call: callDeleteClient } = useDeleteClient()
    const { call: callGetAllUsers } = useGetAllUsers()
    const { call: callGetAllClients } = useGetAllClients()

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

    const getAllUsers = async () => {
        var { data } = await callGetAllUsers()

        var users : Array<UserBasic> = data.data

        var values : Array<SelectOption> = users.map(x => ({ value: x.id, label: `${x.name} (${x.email})` }))

        setAllUsers(values)
    }
    
    const getAllIndicators = async () => {
        var { data } = await callGetAllClients()

        var users : Array<ClientBasic> = data.data

        var values : Array<SelectOption> = users.map(x => ({ value: x.id, label: `${x.name} (${x.email})` }))

        setAllIndicators(values)
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
            setCreator(data.creatorId)
            setCaptivator(data.captivatorId)
            setIndicator(data.indicatorId)
            setIndicatorIsCaptivator(data.indicatorIsCaptivator)
            setObservation(data.observation)
        } catch { }
    }

    useEffect(() => {
        getAllOccupations()
        getAllGenders()
        getAllUsers()
        getAllIndicators()
        getClient()
    }, [])

    const deleteClient = async () => {
        
        const { data } = await callDeleteClient(clientId)

        toast.success(data.message)
        getClient()
    }

    const getIndicator = () => {
        if (indicatorIsCaptivator)
            return allUsers.find(x => x.value === captivator)?.label ?? ''
        else return allIndicators.find(x => x.value === indicator)?.label ?? ''
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
                    <ReadOnly value={FORM_ADD_CLIENT.RADIO_DOCUMENT_TYPE.VALUES.find(x => x.value === documentType)?.label ?? ''} label='Tipo de Documento' />
                    <ReadOnly value={document} label='Documento' />
                    <ReadOnly value={allUsers.find(x => x.value === captivator)?.label ?? ''} label='Captador' />
                    <ReadOnly value={getIndicator()} label='Indicador' />
                    <ReadOnly value={allUsers.find(x => x.value === creator)?.label ?? ''} label='Criador' />
                </div>
                <div className="form-view-client__container__sides__right">
                    { (documentType === '1') && <ReadOnly value={format(birthDate, 'dd/MM/yyyy')} label='Data de nascimento' /> }
                    { (documentType === '1') && <ReadOnly value={allOccupations.find(x => x.value === occupation)?.label ?? ''} label='Profissão' /> }
                    { (documentType === '1') && <ReadOnly value={allGenders.find(x => x.value === gender)?.label ?? ''} label='Gênero' /> }
                    { (gender === '3') &&  <ReadOnly value={genderDetail} label='Especifique' /> }
                    <ReadOnly value={FORM_ADD_CLIENT.RADIO_IS_SMOKER.VALUES.find(x => x.value === isSmoker)?.label ?? ''} label='Fumante' />
                    <ReadOnly value={isActive ? 'Sim' : 'Não'} label='Ativo' />
                </div>
            </div>
            <ReadOnly label='Observação' value={observation} />
            <div className='form-view-client__container__buttons'>
                <Button name='Editar' disabled={!isActive} onClick={() => navigate(PATH_ROUTES.PRIVATE.EDIT_CLIENTS.replace(':id', clientId))} classname='form-view-client__container__buttons__edit' />
                <Button name='Inativar' disabled={!isActive} onClick={deleteClient} classname='form-view-client__container__buttons__remove' />
                <Button name='Voltar' onClick={() => navigate(PATH_ROUTES.PRIVATE.SEARCH_CLIENTS)} classname='form-view-client__container__buttons__back' />
            </div>
        </div>
    )
}