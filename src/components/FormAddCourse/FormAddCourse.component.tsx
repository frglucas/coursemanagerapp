import { ChangeEvent, useState } from 'react';
import './FormAddCourse.style.scss';
import { Input } from '../Input/Input.component';
import { Textarea } from '../Textarea/Textarea.component';
import { Button } from '../Button/Button.component';
import { useNavigate } from 'react-router-dom';
import { PATH_ROUTES } from '../../constants';
import { usePostAddCourse } from '../../hooks/Course/use-post-add-course.hook';
import { toast } from 'react-toastify';

const DESCRIPTION_PLACEHOLDER = 'ex.: Entender e compreender o gerenciamento de vendas, conceitos, recursos, ferramentas, técnicas e aplicações ao negócio.';

export const FormAddCourse = () => {
    const navigate = useNavigate()

    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const { call: callPostAddCourse } = usePostAddCourse()

    const postAddCourse = async () => {
        const form = {
            name: name,
            description: description
        }

        try {
            var { data } = await callPostAddCourse(form)

            navigate(PATH_ROUTES.PRIVATE.SEARCH_COURSES)
            toast.success(data.message)
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
        <form action="none" className='form-add-course__container'>
            <Input value={name} label='Nome do curso' onChange={handleChangeName} placeholder='ex.: Negociação e vendas' />
            <Textarea value={description} label='Descrição' onChange={handleChangeDescription} placeholder={DESCRIPTION_PLACEHOLDER} />
            <div className="form-add-course__container__buttons">
                <Button name="Salvar" onClick={postAddCourse} classname="form-add-course__container__buttons__save" />
                <Button name="Cancelar" onClick={() => navigate(PATH_ROUTES.PRIVATE.SEARCH_COURSES)} classname="form-add-course__container__buttons__cancel" />
            </div>
        </form>
    )
};