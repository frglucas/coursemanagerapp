import { ReactNode } from 'react';
import classNames from 'classnames';
import { Icon } from '../Icon/Icon.component';
import { ICONS } from '../../assets/svgs';

import './ButtonWithIcon.style.scss';

type Props = {
    icon: keyof typeof ICONS,
    disabled?: boolean,
    classname?: string,
    onClick: () => void
}

export const ButtonWithIcon = ({ icon, disabled = false, classname, onClick }: Props) => {
    return (
        <div className={classNames('button-with-icon__container', classname)}>
            <button type='button' disabled={disabled} onClick={onClick} className='button-with-icon__container__button'>
                <Icon name={icon} classname='button-with-icon__container__button__icon' />
            </button>
        </div>
    )
}