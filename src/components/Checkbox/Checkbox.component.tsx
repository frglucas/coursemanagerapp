import classNames from 'classnames';
import './Checkbox.style.scss';
import { ChangeEvent } from 'react';

type Props = {
    checked: boolean,
    label?: string,
    classname?: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox = ({ checked, label, classname, onChange }: Props) => {

    return (
        <div className={classNames('checkbox__container', classname)}>
            { label && <label>{ label }</label> }
            <div className='checkbox__container__content'>
                <input type="checkbox" checked={checked} onChange={onChange} />
            </div>
        </div>
    )
}