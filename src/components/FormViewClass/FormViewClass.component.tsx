import { useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button.component';
import './FormViewClass.style.scss';
import { FORM_ADD_CLASS, PATH_ROUTES } from '../../constants';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ReadOnly } from '../ReadOnly/ReadOnly.component';
import { CourseToAddClass, UserToAddClass } from '../../models';
import { useGetAllCourses, useGetAllUsers, useGetClassById } from '../../hooks';
import { format } from 'date-fns';

type Props = {
    id: string
}

export const FormViewClass = ({ id }: Props) => {
    const navigate = useNavigate()

    const [classId, setClassId] = useState<string>(id)
    const [name, setName] = useState<string>('')
    const [courseId, setCourseId] = useState<string>('none')
    const [ministerId, setMinisterId] = useState<string>('none')
    const [addressOrLink, setAddressOrLink] = useState<string>('')
    const [scheduledDate, setScheduledDate] = useState<Date>(new Date())
    const [isOnline, setIsOnline] = useState<string>(FORM_ADD_CLASS.RADIO_IS_ONLINE.DEFAULT)

    const [allCourses, setAllCourses] = useState<Array<CourseToAddClass>>([])
    const [allUsers, setAllUsers] = useState<Array<UserToAddClass>>([])

    const { call: callGetAllCourses } = useGetAllCourses()
    const { call: callGetAllUsers } = useGetAllUsers()
    const { call: callGetClass  } = useGetClassById()

    const getAllCourses = async () => {
        var { data } = await callGetAllCourses()

        var courses : Array<CourseToAddClass> = data.data

        setAllCourses(courses)
    }

    const getAllUsers = async () => {
        var { data } = await callGetAllUsers()

        var users : Array<UserToAddClass> = data.data

        setAllUsers(users)
    }

    const getClass = async () => {
        try {
            const { data: { data } } = await callGetClass(id)
            
            setClassId(data.id)
            setName(data.name)
            setCourseId(data.courseId)
            setMinisterId(data.ministerId)
            setAddressOrLink(data.addressOrLink)
            setScheduledDate(data.scheduledDate)
            setIsOnline(data.isOnline)
            console.log(data)
        } catch { }
    }

    useEffect(() => {
        getAllCourses()
        getAllUsers()
        getClass()
    }, [])

    return (
        <div className={classNames('form-view-class__container')}>
            <ReadOnly label='Curso' value={allCourses.find(x => x.id === courseId)?.name ?? ''} />
            <ReadOnly label="Nome" value={name} />
            <ReadOnly label="Local ou Link" value={addressOrLink} />
            <ReadOnly label="Data do encontro" value={format(scheduledDate, 'dd/MM/yyyy')} />
            <ReadOnly label="Ministrante" value={allUsers.map(({ id, name, email }) => ({ id: id, name: `${name} (${email})` })).find(x => x.id === ministerId)?.name ?? ''} />
            {/* <RadioCheck selected={isOnline} label='Modalidade' options={FORM_ADD_CLASS.RADIO_IS_ONLINE.VALUES} onChange={handleChangeIsOnline} /> */}
            <div className='form-view-class__container__buttons'>
                <Button name='Editar' onClick={() => navigate(PATH_ROUTES.EDIT_CLASSES.replace(':id', classId))} classname='form-view-class__container__buttons__edit' />
                <Button name='Voltar' onClick={() => navigate(PATH_ROUTES.SEARCH_CLASSES)} classname='form-view-class__container__buttons__back' />
            </div>
        </div>
    )
};