import { ICONS } from '../../assets/svgs'
import { Icon } from '../Icon/Icon.component'
import './MenuItem.style.scss'

type Props = {
    name: string,
    icon: keyof typeof ICONS,
    onClick: () => void
}

export const MenuItem = ({ name, icon, onClick }: Props) => (
    <div onClick={onClick} className='menu-item__container'>
        <Icon name={icon} classname='menu-item__container__icon' />
        <span className='menu-item__container__span'>{ name }</span>
    </div>
)