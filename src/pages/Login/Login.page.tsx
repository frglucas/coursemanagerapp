import classNames from "classnames"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FormLogin, Icon } from "../../components"
import { LoginForm } from "../../models"
import { usePostLogin } from "../../hooks/User/use-post-login.hook"
import { api } from "../../hooks/api"

import './Login.style.scss'

export const Login = () => {
    const navigate = useNavigate()
    const { call } = usePostLogin()

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        if (token)
            navigate('/dashboard')
    }, [navigate])

    const handleLogin = async (form: LoginForm) => {
        const { data } = await call(form)

        const token = data.data.token
        
        sessionStorage.token = token
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`

        navigate('/dashboard')
    }

    return (
        <div className={classNames('login-page__container')}>
            <div className='login-page__container__left'>
                <Icon name="Hat" classname='login-page__container__left__icon' />
            </div>
            <div className='login-page__container__right'>
                <FormLogin handle={handleLogin} />
            </div>
        </div>
    )
}