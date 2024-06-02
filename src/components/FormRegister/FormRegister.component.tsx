import { NavLink } from "react-router-dom"
import { Button } from "../Button/Button.component"
import { Input } from "../Input/Input.component"
import { Title } from "../Title/Title.component"
import { PATH_ROUTES } from "../../constants"
import { ChangeEvent, useState } from "react"
import classNames from "classnames"
import { RegisterForm } from "../../models"

import './FormRegister.style.scss'

type Props = {
    handle: (obj: RegisterForm) => void
}

export const FormRegister = ({ handle }: Props) => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setName(event.target.value)
    }

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setEmail(event.target.value)
    }
    
    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setPassword(event.target.value)
    }

    const handleLogin = async () => {
        try {
            await handle({ name: name, email: email, password: password })   
        } catch (error) {
            setPassword('')
        }
    }

    return (
        <form action="none" className={classNames('form-register-component__container')}>
            <Title name='Cadastre-se' classname='form-register-component__container__title' />
            <Input label='Nome' value={name} onChange={handleChangeName} placeholder='ex.: Maria Aparecida'/>
            <Input label='Email' value={email} onChange={handleChangeEmail} placeholder='example@email.com'/>
            <Input label='Senha' value={password} onChange={handleChangePassword} type="password" autocomplete={true} />
            <Button name='Enviar' onClick={handleLogin} />
            <span className='form-register-component__container__span'>
                ou <NavLink to={PATH_ROUTES.PUBLIC.LOGIN}>Entrar</NavLink>
            </span>
        </form>
    )
}