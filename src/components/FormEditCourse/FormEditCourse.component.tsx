import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "../Input/Input.component"
import { Textarea } from "../Textarea/Textarea.component"
import { Button } from "../Button/Button.component"
import { PATH_ROUTES } from "../../constants"
import { useGetCourseById, usePutEditCourse } from "../../hooks"

import './FormEditCourse.style.scss';
import { EditCourseForm } from "../../models"
import { toast } from "react-toastify"

const DESCRIPTION_PLACEHOLDER = 'ex.: Entender e compreender o gerenciamento de vendas, conceitos, recursos, ferramentas, técnicas e aplicações ao negócio.';

type Props = {
    id: string
}

export const FormEditCourse = ({ id }: Props) => {
    const navigate = useNavigate()

    const [courseId, setCourseId] = useState<string>(id)
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const { call: callGetCourse } = useGetCourseById()
    const { call: callPutEditCourse } = usePutEditCourse()

    const getCourse = async () => {
        try {
            const { data: { data } } = await callGetCourse(id)
            
            setCourseId(data.id)
            setName(data.name)
            setDescription(data.description)
        } catch { }
    }

    useEffect(() => {
        getCourse()
    }, [])

    const putEditCourse = async () => {
        const form : EditCourseForm = {
            courseId: courseId,
            name: name,
            description: description
        }

        try {
            const { data } = await callPutEditCourse(form)
            toast.success(data.message)
            navigate(PATH_ROUTES.SEARCH_COURSES)
        } catch { }
    }

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setName(event.target.value)
    }
    
    const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault()
        setDescription(event.target.value)
    }

    return (
        <form action="none" className='form-edit-course__container'>
            <Input value={name} label='Nome do curso' onChange={handleChangeName} placeholder='ex.: Negociação e vendas' />
            <Textarea value={description} label='Descrição' onChange={handleChangeDescription} placeholder={DESCRIPTION_PLACEHOLDER} />
            <div className="form-edit-course__container__buttons">
                <Button name="Salvar" onClick={putEditCourse} classname="form-edit-course__container__buttons__save" />
                <Button name="Cancelar" onClick={() => navigate(PATH_ROUTES.SEARCH_COURSES)} classname="form-edit-course__container__buttons__cancel" />
            </div>
        </form>
    )
}