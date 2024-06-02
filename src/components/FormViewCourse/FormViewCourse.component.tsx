import { useNavigate } from "react-router-dom"

import './FormViewCourse.style.scss';
import { useEffect, useState } from "react";
import { useDeleteCourse, useGetCourseById } from "../../hooks";
import { ReadOnly } from "../ReadOnly/ReadOnly.component";
import classNames from "classnames";
import { Button } from "../Button/Button.component";
import { PATH_ROUTES } from "../../constants";
import { toast } from "react-toastify";

type Props = {
    id: string
}

export const FormViewCourse = ({ id }: Props) => {
    const navigate = useNavigate()

    const [courseId, setCourseId] = useState<string>(id)
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [isActive, setIsActive] = useState<string>('')

    const { call: callGetCourse } = useGetCourseById()
    const { call: callDeleteCourse } = useDeleteCourse()

    const getCourse = async () => {
        try {
            const { data: { data } } = await callGetCourse(id)
            
            setCourseId(data.id)
            setName(data.name)
            setDescription(data.description)
            setIsActive(data.isActive)
        } catch { }
    }

    useEffect(() => {
        getCourse()
    }, [])

    const deleteCourse = async () => {
        
        const { data } = await callDeleteCourse(courseId)

        toast.success(data.message)
        getCourse()
    }

    return(
        <div className={classNames('form-view-course__container')}>
            <ReadOnly value={name} label="Nome do curso" />
            <ReadOnly value={description} label="Descrição" />
            <ReadOnly value={isActive ? 'Sim' : 'Não'} label="Ativo" />
            <div className='form-view-course__container__buttons'>
                <Button name='Editar' disabled={!isActive} onClick={() => navigate(PATH_ROUTES.PRIVATE.EDIT_COURSES.replace(':id', courseId))} classname='form-view-client__container__buttons__edit' />
                <Button name='Inativar' disabled={!isActive} onClick={deleteCourse} classname='form-view-client__container__buttons__remove' />
                <Button name='Voltar' onClick={() => navigate(PATH_ROUTES.PRIVATE.SEARCH_COURSES)} classname='form-view-client__container__buttons__back' />
            </div>
        </div>
    )
}