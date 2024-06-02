import classNames from "classnames"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { FormLogin, Icon } from "../../components"
import { PATH_ROUTES } from "../../constants"
import { LoginForm } from "../../models"
import { useAuth } from "../../contexts"

import './Login.style.scss'

export const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { signIn } = useAuth()    

    useEffect(() => {
        if (location?.state?.isSignOut) sessionStorage.removeItem('token')
        else if (sessionStorage.getItem('token') !== null) {
            navigate(PATH_ROUTES.PRIVATE.DASHBOARD)
            return;
        }
        console.log(process.env)
    }, [navigate])

    const handleLogin = async (form: LoginForm) => {
        signIn(form)
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