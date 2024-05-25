import { ChangeEvent, useEffect, useState } from "react"
import { Input } from "../Input/Input.component"
import { CalendarPicker } from "../CalendarPicker/CalendarPicker.component"
import { RadioCheck } from "../RadioCheck/RadioCheck.component"
import { FORM_ADD_CLIENT, PATH_ROUTES } from "../../constants"
import { Select } from "../Select/Select.component"
import { useGetAllOccupations, usePostAddClient } from "../../hooks"
import { SelectOption } from "../../models"
import { Occupation } from "../../models/Occupation/Occupation.models"
import { toast } from "react-toastify"
import { Button } from "../Button/Button.component"
import { useNavigate } from "react-router-dom"

import './FormAddClient.style.scss';

export const FormAddClient = () => {
    const navigate = useNavigate()

    // form region
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
    // end form region

    const [allOccupations, setAllOccupations] = useState<Array<SelectOption>>([])
    const [allGenders, setAllGenders] = useState<Array<SelectOption>>([])

    const { call: callGetAllOccupations } = useGetAllOccupations()
    const { call: callPostAddClient } = usePostAddClient()

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

    const postAddClient = async () => {
        const form = {
            fullName: fullName,
            badgeName: badgeName,
            email: email,
            document: document,
            documentType: (documentType === 'none') ? 0 : parseInt(documentType),
            birthDate: birthDate,
            occupationId: (occupation === 'none') ? '' : occupation,
            isSmoker: (isSmoker === 'true'),
            genderType: (gender === 'none') ? 0 : parseInt(gender),
            genderDetail: genderDetail
        }

        try {
            var { data } = await callPostAddClient(form)

            console.log(data)
            navigate(PATH_ROUTES.SEARCH_CLIENTS)
            toast.success(data.message)
        } catch { }
    }

    useEffect(() => {
        getAllOccupations()
        getAllGenders()
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
    
    const handleChangeDocumentType = (event: ChangeEvent<HTMLInputElement>) => setDocumentType(event.target.value)
    
    const handleChangeDocument = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setDocument(event.target.value)
    }

    const handleChangeBirthDate = (event: ChangeEvent<HTMLInputElement>) => setBirthDate(new Date(event.target.value))

    const handleChangeIsSmoker = (event: ChangeEvent<HTMLInputElement>) => setIsSmoker(event.target.value)

    const handleChangeOccupation = (event: ChangeEvent<HTMLSelectElement>) => setOccupation(event.target.value)

    const handleChangeGender = (event: ChangeEvent<HTMLSelectElement>) => setGender(event.target.value)
    
    const handleChangeGenderDetail = (event: ChangeEvent<HTMLInputElement>) => setGenderDetail(event.target.value)

    return (
        <form action="none" className="form-add-client__container">
            <div className="form-add-client__container__name-content">
                <Input value={fullName} label="Nome" onChange={handleChangeFullName} placeholder="ex.: José Silva" />
                <Input value={badgeName} label="Nome no crachá" onChange={handleChangeBadgeName} placeholder="ex.: Zé" />
            </div>
            <Input value={email} label="Email" onChange={handleChangeEmail} placeholder="ex.: jose.silva@mail.com" />
            <div className="form-add-client__container__sides">
                <div className="form-add-client__container__sides__left">
                    <CalendarPicker label="Data de nascimento" value={birthDate} onChange={handleChangeBirthDate} />
                    <Select value={occupation} label="Profissão" options={allOccupations} onChange={handleChangeOccupation} />
                    <Select value={gender} label="Gênero" options={allGenders} onChange={handleChangeGender} />
                    { ( gender === '3' ) && <Input value={genderDetail} label="Especifique" onChange={handleChangeGenderDetail} /> }
                </div>
                <div className="form-add-client__container__sides__right">
                    <RadioCheck selected={documentType} label="Tipo de Documento" options={FORM_ADD_CLIENT.RADIO_DOCUMENT_TYPE.VALUES} onChange={handleChangeDocumentType} />
                    <Input value={document} label="Documento" onChange={handleChangeDocument} placeholder={documentType === 'CPF' ? 'ex.: 000.000.000-00' : 'ex.: 00.000.000/0000-00'} />
                    <RadioCheck selected={isSmoker} label='Fumante' options={FORM_ADD_CLIENT.RADIO_IS_SMOKER.VALUES} onChange={handleChangeIsSmoker} />
                </div>
            </div>
            <div className="form-add-client__container__buttons">
                <Button name="Salvar" onClick={postAddClient} classname="form-add-client__container__buttons__save" />
                <Button name="Cancelar" onClick={() => navigate(PATH_ROUTES.SEARCH_CLIENTS)} classname="form-add-client__container__buttons__cancel" />
            </div>
        </form>
    )
}