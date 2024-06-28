import { ChangeEvent, useEffect, useState } from "react"
import { Input } from "../Input/Input.component"
import { CalendarPicker } from "../CalendarPicker/CalendarPicker.component"
import { RadioCheck } from "../RadioCheck/RadioCheck.component"
import { FORM_ADD_CLIENT, PATH_ROUTES } from "../../constants"
import { Select } from "../Select/Select.component"
import { useGetAllClients, useGetAllOccupations, useGetAllUsers, usePostAddClient } from "../../hooks"
import { AddClientForm, ClientBasic, SelectOption, UserBasic } from "../../models"
import { Occupation } from "../../models/Occupation/Occupation.models"
import { toast } from "react-toastify"
import { Button } from "../Button/Button.component"
import { useLocation, useNavigate } from "react-router-dom"
import { Textarea } from "../Textarea/Textarea.component"

import './FormAddClient.style.scss';
import { format } from "date-fns"

export const FormAddClient = () => {
    const { state } = useLocation()
    const navigate = useNavigate()

    // form region
    const [fullName, setFullName] = useState<string>(state?.fullName ?? '')
    const [badgeName, setBadgeName] = useState<string>('')
    const [email, setEmail] = useState<string>(state?.email ?? '')
    const [document, setDocument] = useState<string>('')
    const [documentType, setDocumentType] = useState<string>(FORM_ADD_CLIENT.RADIO_DOCUMENT_TYPE.DEFAULT)
    const [birthDate, setBirthDate] = useState<Date>(new Date())
    const [gender, setGender] = useState<string>('none')
    const [genderDetail, setGenderDetail] = useState<string>('')
    const [occupation, setOccupation] = useState<string>('none')
    const [isSmoker, setIsSmoker] = useState<string>(FORM_ADD_CLIENT.RADIO_IS_SMOKER.DEFAULT)
    const [captivator, setCaptivator] = useState<string>(state?.creatorId ?? 'none')
    const [indicator, setIndicator] = useState<string>('none')
    const [indicatorIsCaptivator, setIndicatorIsCaptivator] = useState<string>(FORM_ADD_CLIENT.RADIO_INDICATOR_IS_CAPTIVATOR.DEFAULT)
    const [observation, setObservation] = useState<string>(state?.observation ?? '')
    const [areaCode, setAreaCode] = useState<string>(state?.areaCode ?? FORM_ADD_CLIENT.SELECT_AREA_CODE.DEFAULT)
    const [phoneNumber, setPhoneNumber] = useState<string>(state?.phoneNumber ?? '')
    // end form region

    const [allOccupations, setAllOccupations] = useState<Array<SelectOption>>([])
    const [allGenders, setAllGenders] = useState<Array<SelectOption>>([])
    const [allUsers, setAllUsers] = useState<Array<SelectOption>>([])
    const [allIndicators, setAllIndicators] = useState<Array<SelectOption>>([])
    const [allAreaCodes, ] = useState<Array<SelectOption>>(FORM_ADD_CLIENT.SELECT_AREA_CODE.VALUES)

    const { call: callGetAllOccupations } = useGetAllOccupations()
    const { call: callPostAddClient } = usePostAddClient()
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

    const postAddClient = async () => {
        const form : AddClientForm = {
            leadId: state?.leadId ?? null,
            fullName: fullName,
            badgeName: badgeName,
            email: email,
            document: document,
            documentType: (documentType === 'none') ? 0 : parseInt(documentType),
            birthDate: birthDate,
            occupationId: (occupation === 'none') ? null : occupation,
            isSmoker: (isSmoker === 'true'),
            genderType: (gender === 'none') ? 0 : parseInt(gender),
            genderDetail: genderDetail,
            indicatorIsCaptivator: (indicatorIsCaptivator === 'true'),
            indicatorId: (indicator === 'none') ? null : indicator,
            captivatorId: (captivator === 'none') ? null : captivator,
            observation: observation,
            phoneNumbers: [{ areaCode: areaCode, phoneNumber: phoneNumber }]
        }

        try {
            var { data } = await callPostAddClient(form)

            navigate(PATH_ROUTES.PRIVATE.SEARCH_CLIENTS)
            toast.success(data.message)
        } catch { }
    }

    useEffect(() => {
        getAllOccupations()
        getAllGenders()
        getAllUsers()
        getAllIndicators()
    }, [])

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

    const handleChangeBirthDate = (event: ChangeEvent<HTMLInputElement>) => setBirthDate(new Date(event.target.value))

    const handleChangeIsSmoker = (event: ChangeEvent<HTMLInputElement>) => setIsSmoker(event.target.value)

    const handleChangeIndicatorIsCaptivator = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === 'true')
            setIndicator('none')
        setIndicatorIsCaptivator(event.target.value)
    }

    const handleChangeOccupation = (event: ChangeEvent<HTMLSelectElement>) => setOccupation(event.target.value)
    
    const handleChangeCaptivator = (event: ChangeEvent<HTMLSelectElement>) => setCaptivator(event.target.value)
    
    const handleChangeIndicator = (event: ChangeEvent<HTMLSelectElement>) => setIndicator(event.target.value)

    const handleChangeGender = (event: ChangeEvent<HTMLSelectElement>) => setGender(event.target.value)
    
    const handleChangeGenderDetail = (event: ChangeEvent<HTMLInputElement>) => setGenderDetail(event.target.value)
    
    const handleChangeObservation = (event: ChangeEvent<HTMLTextAreaElement>) => setObservation(event.target.value)

    const handleChangeAreaCode = (event: ChangeEvent<HTMLSelectElement>) => setAreaCode(event.target.value)

    const handleChangePhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setPhoneNumber(event.target.value)
    }

    return (
        <form action="none" className="form-add-client__container">
            <div className="form-add-client__container__name-content">
                <Input value={fullName} label="Nome" onChange={handleChangeFullName} placeholder="ex.: José Silva" />
                <Input value={badgeName} label="Nome no crachá" onChange={handleChangeBadgeName} placeholder="ex.: Zé" />
            </div>
            <Input value={email} label="Email" onChange={handleChangeEmail} placeholder="ex.: jose.silva@mail.com" />
            <div className="form-add-client__container__sides">
                <div className="form-add-client__container__sides__left">
                    <RadioCheck selected={documentType} label="Tipo de Documento" options={FORM_ADD_CLIENT.RADIO_DOCUMENT_TYPE.VALUES} onChange={handleChangeDocumentType} />
                    <Input value={document} label="Documento" onChange={handleChangeDocument} placeholder={documentType === '1' ? 'ex.: 000.000.000-00' : 'ex.: 00.000.000/0000-00'} />
                    <Select value={captivator} label="Captador" options={allUsers} onChange={handleChangeCaptivator} />
                    <RadioCheck selected={indicatorIsCaptivator}  label={'Indicado por:'} options={FORM_ADD_CLIENT.RADIO_INDICATOR_IS_CAPTIVATOR.VALUES} onChange={handleChangeIndicatorIsCaptivator} />
                    { (indicatorIsCaptivator === 'false') && <Select value={indicator} label="Indicador" options={allIndicators} onChange={handleChangeIndicator} /> }
                </div>
                <div className="form-add-client__container__sides__right">
                    { (documentType === '1') && <CalendarPicker max={format(new Date(), 'yyyy-MM-dd')} label="Data de nascimento" value={birthDate} onChange={handleChangeBirthDate} /> }
                    <div className='form-add-client__container__sides__right__phone-number'>
                        <Select label='DDD' value={areaCode} options={allAreaCodes} onChange={handleChangeAreaCode} classname='form-add-lead__container__phone-number__area-code'/>
                        <Input value={phoneNumber} label="Número de celular" onChange={handleChangePhoneNumber} placeholder="ex.: 98765-4321" classname='form-add-lead__container__phone-number__number' />
                    </div>
                    { (documentType === '1') && <Select value={occupation} label="Profissão" options={allOccupations} onChange={handleChangeOccupation} /> }
                    { (documentType === '1') && <Select value={gender} label="Gênero" options={allGenders} onChange={handleChangeGender} /> }
                    { ( gender === '3' ) && <Input value={genderDetail} label="Especifique" onChange={handleChangeGenderDetail} /> }
                    <RadioCheck selected={isSmoker} label='Fumante' options={FORM_ADD_CLIENT.RADIO_IS_SMOKER.VALUES} onChange={handleChangeIsSmoker} />
                </div>
            </div>
            <Textarea label="Observação" value={observation} onChange={handleChangeObservation} maxLength={512} />
            <div className="form-add-client__container__buttons">
                <Button name="Salvar" onClick={postAddClient} classname="form-add-client__container__buttons__save" />
                <Button name="Cancelar" onClick={() => navigate(PATH_ROUTES.PRIVATE.SEARCH_CLIENTS)} classname="form-add-client__container__buttons__cancel" />
            </div>
        </form>
    )
}