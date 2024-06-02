import { ChangeEvent, useEffect, useState } from "react"
import { Button } from "../Button/Button.component"
import { FORM_ADD_CLASS, PATH_ROUTES } from "../../constants"
import { useNavigate } from "react-router-dom"
import { Select } from "../Select/Select.component";
import { Input } from "../Input/Input.component";
import { CalendarPicker } from "../CalendarPicker/CalendarPicker.component";
import { RadioCheck } from "../RadioCheck/RadioCheck.component";

import './FormAddClass.style.scss';
import { useGetAllCourses } from "../../hooks/Course/use-get-all-courses.hook";
import { CourseBasic, SelectOption, UserBasic } from "../../models";
import { useGetAllUsers } from "../../hooks";
import { usePostAddClass } from "../../hooks/Class/use-post-add-class.hook";
import { toast } from "react-toastify";

export const FormAddClass = () => {
    const navigate = useNavigate()

    const [name, setName] = useState<string>('')
    const [courseId, setCourseId] = useState<string>('none')
    const [ministerId, setMinisterId] = useState<string>('none')
    const [addressOrLink, setAddressOrLink] = useState<string>('')
    const [scheduledDate, setScheduledDate] = useState<Date>(new Date())
    const [isOnline, setIsOnline] = useState<string>(FORM_ADD_CLASS.RADIO_IS_ONLINE.DEFAULT)

    const [allCourses, setAllCourses] = useState<Array<SelectOption>>([])
    const [allUsers, setAllUsers] = useState<Array<SelectOption>>([])

    const { call: callGetAllCourses } = useGetAllCourses()
    const { call: callGetAllUsers } = useGetAllUsers()
    const { call: callPostAddClass } = usePostAddClass()

    const getAllCourses = async () => {
        var { data } = await callGetAllCourses()

        var courses : Array<CourseBasic> = data.data

        var values : Array<SelectOption> = courses.map(x => ({ value: x.id, label: x.name }))

        setAllCourses(values)
    }

    const getAllUsers = async () => {
        var { data } = await callGetAllUsers()

        var users : Array<UserBasic> = data.data

        var values : Array<SelectOption> = users.map(x => ({ value: x.id, label: `${x.name} (${x.email})` }))

        setAllUsers(values)
    }

    const postAddClass = async () => {
        const form = {
            courseId: (courseId === 'none') ? '' : courseId,
            ministerId: (ministerId === 'none') ? '' : ministerId,
            name: name,
            addressOrLink: addressOrLink,
            scheduledDate: scheduledDate,
            isOnline: (isOnline === 'true')
        }

        try {
            var { data } = await callPostAddClass(form)

            navigate(PATH_ROUTES.PRIVATE.SEARCH_CLASSES)
            toast.success(data.message)
        } catch { }
    }

    useEffect(() => {
        getAllCourses()
        getAllUsers()
    }, [])

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setName(event.target.value)
    }
    
    const handleChangeAddressOrLink = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setAddressOrLink(event.target.value)
    }

    const handleChangeCourse = (event: ChangeEvent<HTMLSelectElement>) => setCourseId(event.target.value)
    
    const handleChangeMinister = (event: ChangeEvent<HTMLSelectElement>) => setMinisterId(event.target.value)

    const handleChangeScheduledDate = (event: ChangeEvent<HTMLInputElement>) => setScheduledDate(new Date(event.target.value))

    const handleChangeIsOnline = (event: ChangeEvent<HTMLInputElement>) => setIsOnline(event.target.value)

    return (
        <form action="none" className="form-add-class__container">
            <Select value={courseId} label="Curso" options={allCourses} onChange={handleChangeCourse} />
            <Input value={name} label="Nome" onChange={handleChangeName} placeholder="ex.: Negociação e Vendas 001" />
            <Input value={addressOrLink} label="Local ou Link" onChange={handleChangeAddressOrLink} placeholder="ex.: Hotel Bis" />
            <CalendarPicker label="Data do encontro" value={scheduledDate} onChange={handleChangeScheduledDate} />
            <Select value={ministerId} label="Ministrante" options={allUsers} onChange={handleChangeMinister} classname="form-add-class__container__select-minister" />
            <RadioCheck selected={isOnline} label='Modalidade' options={FORM_ADD_CLASS.RADIO_IS_ONLINE.VALUES} onChange={handleChangeIsOnline} />
            <div className="form-add-class__container__buttons">
                <Button name="Salvar" onClick={postAddClass} classname="form-add-class__container__buttons__save" />
                <Button name="Cancelar" onClick={() => navigate(PATH_ROUTES.PRIVATE.SEARCH_CLASSES)} classname="form-add-class__container__buttons__cancel" />
            </div>
        </form>
    )
}