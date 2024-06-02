import classNames from "classnames"
import { FormRegister, Icon } from "../../components"
import { useEffect } from "react"
import { PATH_ROUTES } from "../../constants"
import { useLocation, useNavigate } from "react-router-dom"

import './Register.style.scss'
import { RegisterForm } from "../../models"
import { usePostRegister } from "../../hooks"

export const Register = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const { call } = usePostRegister()

    useEffect(() => {
        if (location?.state?.isSignOut) sessionStorage.removeItem('token')
        else if (sessionStorage.getItem('token') !== null) {
            navigate(PATH_ROUTES.PRIVATE.DASHBOARD)
            return;
        }
    }, [navigate])

    const handleRegister = async (form: RegisterForm) => {
        try {
            await call(form)
            navigate(PATH_ROUTES.PUBLIC.LOGIN)
        } 
        catch  { }
    }

    return (
        <div className={classNames('register-page__container')}>
            <div className='register-page__container__left'>
                <Icon name="Hat" classname='register-page__container__left__icon' />
            </div>
            <div className='register-page__container__right'>
                <FormRegister handle={handleRegister} />
            </div>
        </div>
    )
}