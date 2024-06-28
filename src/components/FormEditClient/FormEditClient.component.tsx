import { ChangeEvent, useEffect, useState } from 'react';
import './FormEditClient.style.scss';
import { FORM_ADD_CLIENT, PATH_ROUTES } from '../../constants';
import { useGetAllClients, useGetAllOccupations, useGetAllUsers, useGetClientById } from '../../hooks';
import { ClientBasic, EditClientForm, SelectOption, UserBasic } from '../../models';
import { Input } from '../Input/Input.component';
import { CalendarPicker } from '../CalendarPicker/CalendarPicker.component';
import { Select } from '../Select/Select.component';
import { RadioCheck } from '../RadioCheck/RadioCheck.component';
import { Button } from '../Button/Button.component';
import { useNavigate } from 'react-router-dom';
import { Occupation } from '../../models/Occupation/Occupation.models';
import { usePutEditClient } from '../../hooks/Client/use-put-edit-client.hook';
import { toast } from 'react-toastify';
import { Textarea } from '../Textarea/Textarea.component';
import { format } from 'date-fns';

type Props = {
    id: string
}

export const FormEditClient = ({ id }: Props) => {
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
    const [captivator, setCaptivator] = useState<string>('none')
    const [indicator, setIndicator] = useState<string>('none')
    const [indicatorIsCaptivator, setIndicatorIsCaptivator] = useState<string>(FORM_ADD_CLIENT.RADIO_INDICATOR_IS_CAPTIVATOR.DEFAULT)
    const [observation, setObservation] = useState<string>('')

    const [allOccupations, setAllOccupations] = useState<Array<SelectOption>>([])
    const [allGenders, setAllGenders] = useState<Array<SelectOption>>([])
    const [allUsers, setAllUsers] = useState<Array<SelectOption>>([])
    const [allIndicators, setAllIndicators] = useState<Array<SelectOption>>([])

    const { call: callGetAllOccupations } = useGetAllOccupations()
    const { call: callGetClient } = useGetClientById()
    const { call: callPutEditClient } = usePutEditClient()
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
            setCaptivator(data.captivatorId)
            setIndicatorIsCaptivator(`${data.indicatorId === ''}`)
            setIndicator(data.indicatorId)
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

    const putEditClient = async () => {
        const form : EditClientForm = {
            clientId: clientId,
            fullName: fullName,
            badgeName: badgeName,
            email: email,
            document: document,
            documentType: (documentType === 'none') ? 0 : parseInt(documentType),
            birthDate: birthDate,
            occupationId: (occupation === 'none') ? '' : occupation,
            isSmoker: (isSmoker === 'true'),
            genderType: (gender === 'none') ? 0 : parseInt(gender),
            genderDetail: genderDetail,
            indicatorId: indicator,
            captivatorId: captivator,
            indicatorIsCaptivator: (indicatorIsCaptivator === 'true'),
            observation: observation
        }

        try {
            const { data } = await callPutEditClient(form)
            toast.success(data.message)
            navigate(PATH_ROUTES.PRIVATE.SEARCH_CLIENTS)
        } catch { }
    }

    const handleChangeFullName = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setFullName(event.target.value)
    }

    const handleChangeBadgeName = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setBadgeName(event.target.value)
    }
    
    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setEmail(event.target.value)
    }
    
    const handleChangeDocumentType = (event: ChangeEvent<HTMLInputElement>) => {
        setDocumentType(event.target.value)
        if (event.target.value === '2') {
            setBirthDate(new Date())
            setOccupation('none')
            setGender('0')
        }
    }
    
    const handleChangeDocument = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setDocument(event.target.value)
    }

    const handleChangeIndicatorIsCaptivator = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === 'true')
            setIndicator('none')
        setIndicatorIsCaptivator(event.target.value)
    }

    const handleChangeCaptivator = (event: ChangeEvent<HTMLSelectElement>) => setCaptivator(event.target.value)
    
    const handleChangeIndicator = (event: ChangeEvent<HTMLSelectElement>) => setIndicator(event.target.value)

    const handleChangeBirthDate = (event: ChangeEvent<HTMLInputElement>) => setBirthDate(new Date(event.target.value))

    const handleChangeIsSmoker = (event: ChangeEvent<HTMLInputElement>) => setIsSmoker(event.target.value)

    const handleChangeOccupation = (event: ChangeEvent<HTMLSelectElement>) => setOccupation(event.target.value)

    const handleChangeGender = (event: ChangeEvent<HTMLSelectElement>) => setGender(event.target.value)
    
    const handleChangeGenderDetail = (event: ChangeEvent<HTMLInputElement>) => setGenderDetail(event.target.value)

    const handleChangeObservation = (event: ChangeEvent<HTMLTextAreaElement>) => setObservation(event.target.value)

    return (
        <form action="none" className="form-edit-client__container">
            <div className="form-edit-client__container__name-content">
                <Input value={fullName} label="Nome" onChange={handleChangeFullName} placeholder="ex.: José Silva" />
                <Input value={badgeName} label="Nome no crachá" onChange={handleChangeBadgeName} placeholder="ex.: Zé" />
            </div>
            <Input value={email} label="Email" onChange={handleChangeEmail} placeholder="ex.: jose.silva@mail.com" />
            <div className="form-edit-client__container__sides">
                <div className="form-edit-client__container__sides__left">
                    <RadioCheck selected={documentType} label="Tipo de Documento" options={FORM_ADD_CLIENT.RADIO_DOCUMENT_TYPE.VALUES} onChange={handleChangeDocumentType} />
                    <Input value={document} label="Documento" onChange={handleChangeDocument} placeholder={documentType === 'CPF' ? 'ex.: 000.000.000-00' : 'ex.: 00.000.000/0000-00'} />
                    <Select value={captivator} label="Captador" options={allUsers} onChange={handleChangeCaptivator} />
                    <RadioCheck selected={indicatorIsCaptivator}  label={'Indicado por:'} options={FORM_ADD_CLIENT.RADIO_INDICATOR_IS_CAPTIVATOR.VALUES} onChange={handleChangeIndicatorIsCaptivator} />
                    { (indicatorIsCaptivator === 'false') && <Select value={indicator} label="Indicador" options={allIndicators} onChange={handleChangeIndicator} /> }
                </div>
                <div className="form-edit-client__container__sides__right">
                    { (documentType === '1') && <CalendarPicker max={format(new Date(), 'yyyy-MM-dd')} label="Data de nascimento" value={birthDate} onChange={handleChangeBirthDate} /> }
                    { (documentType === '1') && <Select value={occupation} label="Profissão" options={allOccupations} onChange={handleChangeOccupation} /> }
                    { (documentType === '1') && <Select value={gender} label="Gênero" options={allGenders} onChange={handleChangeGender} /> }
                    { ( gender === '3' ) && <Input value={genderDetail} label="Especifique" onChange={handleChangeGenderDetail} /> }
                    <RadioCheck selected={isSmoker} label='Fumante' options={FORM_ADD_CLIENT.RADIO_IS_SMOKER.VALUES} onChange={handleChangeIsSmoker} />
                </div>
            </div>
            <Textarea label="Observação" value={observation} onChange={handleChangeObservation} maxLength={512} />
            <div className="form-edit-client__container__buttons">
                <Button name="Salvar" onClick={putEditClient} classname="form-edit-client__container__buttons__save" />
                <Button name="Cancelar" onClick={() => navigate(PATH_ROUTES.PRIVATE.SEARCH_CLIENTS)} classname="form-edit-client__container__buttons__cancel" />
            </div>
        </form>
    )
}