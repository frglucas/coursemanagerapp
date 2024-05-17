import classNames from 'classnames'
import './Input.style.scss'
import { ChangeEvent } from 'react'

type Props = {
    value: string,
    label?: string,
    type?: 'text' | 'password',
    placeholder?: string,
    classname?: string,
    autocomplete?: boolean,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ value, label, type = 'text', placeholder, classname, autocomplete = false, onChange }: Props) => {
    return (
        <div className={classNames('input-component__container', classname)}>
            { label && <label>{ label }</label> }
            <div className='input-component__container__content'>
                <input value={value} type={type} placeholder={placeholder} onChange={onChange} autoComplete={autocomplete ? 'on' : 'off'} />
            </div>
        </div>
    )
}