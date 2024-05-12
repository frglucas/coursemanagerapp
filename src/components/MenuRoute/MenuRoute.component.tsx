import { NavLink, useNavigate } from 'react-router-dom'
import { ICONS } from '../../assets/svgs'
import { Icon } from '../Icon/Icon.component'

import './MenuRoute.style.scss'
import classNames from 'classnames'
import { MenuItem as MenuItemModel } from '../../models/Menu/Menu.models'
import { MenuItem } from '../MenuItem/MenuItem.component'

type Props = {
    name: string,
    path: string,
    icon: keyof typeof ICONS,
    itens?: Array<MenuItemModel>,
    isSelected: boolean,
    onClickGroup: () => void
}

export const MenuRoute = ({ name, path, icon: iconMain, itens, isSelected, onClickGroup }: Props) => {
    const navigate = useNavigate()

    const renderIcon = () => (
        <Icon name={iconMain} classname='menu-route__container__icon' />
    )

    const renderName = () => (
        <span className='menu-route__container__span'>{ name }</span>
    )

    const renderNavLink = () => (
        <NavLink to={path} className={'menu-route__container__navlink'}>
            { renderIcon() }
            { renderName() }
        </NavLink>
    )

    const renderArrow = () => (
        <Icon name='Arrow' classname={classNames('menu-route__container__group__header__content__arrow', { 'menu-route__container__group__header__content__arrow__selected': isSelected })} />
    )

    const renderGroupHeader = () => (
        <div className={classNames('menu-route__container__group__header', { 'menu-route__container__group__header__selected': isSelected })}>
            <div className='menu-route__container__group__header__content'>
                { renderIcon() }
                { renderName() }
                { renderArrow() }
            </div>
        </div>
    )

    const renderGroup = () => (
        <div onClick={onClickGroup} className={classNames('menu-route__container__group')}>
            { renderGroupHeader() }
            <div className={classNames('menu-route__container__group__itens', { 'menu-route__container__group__itens__selected': isSelected })}>
                { 
                    itens?.map(({ name, icon, path }, index) => <MenuItem key={`menu-item-${index}`} name={name} icon={icon} onClick={() => navigate(path)} />) 
                }
            </div>
        </div>
    )

    return (
        <div className='menu-route__container'>
            { itens ? renderGroup() : renderNavLink() }
        </div>
    )
}