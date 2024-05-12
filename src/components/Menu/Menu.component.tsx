import { useEffect, useState } from 'react'
import { MENU_ROUTES } from '../../constants/Menu.constants'
import { Icon } from '../Icon/Icon.component'
import { MenuRoute } from '../MenuRoute/MenuRoute.component'
import './Menu.style.scss'
import { useAuth } from '../../contexts'
import classNames from 'classnames'
import { useGetUser } from '../../hooks'

type Props = {
    showMenu: boolean,
    isMobile: boolean,
    onClickMenuButton: () => void
}

export const Menu = ({ showMenu, isMobile, onClickMenuButton }: Props) => {
    const { user, signOut } = useAuth()

    const [selectedGroup, setSelectedGroup] = useState<number>(-1)  

    const handleClickGroup = (key: number) => {
        if (key === selectedGroup) setSelectedGroup(-1)
        else setSelectedGroup(key)
    }

    const renderHeader = () => (
        <div className='menu-component__container__header'>
            <Icon name='Hat' classname='menu-component__container__header__icon' />
        </div>
    )

    const renderFooter = () => (
        <div className='menu-component__container__footer'>
            <span>{ user?.name }</span>
            <button type='button' onClick={signOut} className='menu-component__container__footer__button'>
                <Icon name='Signout' classname='menu-component__container__footer__button__icon' />
            </button>
        </div>
    )

    const renderButtonOpen = () => (
        <button type='button' onClick={onClickMenuButton} className={classNames('menu-component__container__button', { 'menu-component__container__button__closed': !showMenu })}>
            <Icon name={ showMenu ? 'MenuOpen' : 'Menu' } classname='menu-component__container__button__icon' />
        </button>
    )

    return (
        <div className={classNames('menu-component__container', { 'menu-component__container__open': showMenu })}>
            { renderHeader() }
            { isMobile && renderButtonOpen() }
            <div className='menu-component__container__content'>
                { 
                    MENU_ROUTES.map(({ name, path, icon, itens }, index) => 
                        <MenuRoute 
                            key={`menu-item-${index}`} 
                            name={name} 
                            path={path} 
                            icon={icon}
                            itens={itens}
                            isSelected={selectedGroup === index}
                            onClickGroup={() => handleClickGroup(index)} />
                    ) 
                }
            </div>
            { renderFooter() }
        </div>
    )
}