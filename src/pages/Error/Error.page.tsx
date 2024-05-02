import classNames from 'classnames'
import './Error.style.scss'
import { Image } from '../../components/Image/Image.component'
import { useNavigate } from 'react-router-dom'

export const Error = () => {
    const navigate = useNavigate()

    const handleClickButton = () => navigate('/')

    const renderLeft = () => (
        <div className={'error-page__container__left'}>
            <Image name={'CloudX'} classname='error-page__container__left__image' />
        </div>
    )

    const renderRight = () => (
        <div className={'error-page__container__right'}>
            <h3 className={'error-page__container__right__title'}>Oops!</h3>
            <h6 className={'error-page__container__right__subtitle'}>404 - Página não encontrada</h6>
            <span className={'error-page__container__right__span'}>A página foi removida ou está temporariamente indisponível.</span>
            <button 
                type='button' 
                onClick={handleClickButton}
                className={'error-page__container__right__button'}>
                Voltar ao início
            </button>
        </div>
    )

    return (
        <div className={classNames('error-page__container')}>
            { renderLeft() }
            { renderRight() }
        </div>
    )
}