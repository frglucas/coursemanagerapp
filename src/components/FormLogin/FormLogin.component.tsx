import classNames from 'classnames'
import { Title } from '../Title/Title.component'
import { Input } from '../Input/Input.component'
import { Button } from '../Button/Button.component'
import { NavLink } from 'react-router-dom'
import { ChangeEvent, useState } from 'react'

import './FormLogin.style.scss'
import { LoginForm } from '../../models'
import { PATH_ROUTES } from '../../constants'

type Props = {
    handle: (obj: LoginForm) => void
}

export const FormLogin = ({ handle }: Props) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

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
            await handle({ email: email, password: password })   
        } catch (error) {
            setPassword('')
        }
    }

    const handleSubmitForm = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    return (
        <form action='none' onSubmit={handleSubmitForm} className={classNames('form-login-component__container')}>
            <Title name='Login' classname='form-login-component__container__title' />
            <Input label='Email' value={email} onChange={handleChangeEmail} placeholder='example@email.com'/>
            <Input label='Senha' value={password} onChange={handleChangePassword} type="password" autocomplete={true} />
            <Button type='submit' name='Entrar' onClick={handleLogin} />
            <span className='form-login-component__container__span'>
                ou <NavLink to={PATH_ROUTES.PUBLIC.REGISTER}>Cadastre-se</NavLink>
            </span>
        </form>
    )
}