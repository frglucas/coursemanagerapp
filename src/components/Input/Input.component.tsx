import classNames from 'classnames'
import './Input.style.scss'
import { ChangeEvent } from 'react'

type Props = {
    value: string,
    label?: string,
    type?: 'text' | 'password',
    placeholder?: string,
    classname?: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ value, label, type = 'text', placeholder, classname, onChange }: Props) => {
    return (
        <div className={classNames('input-component__container', classname)}>
            { label && <label>{ label }</label> }
            <div className='input-component__container__content'>
                <input value={value} type={type} placeholder={placeholder} onChange={onChange}/>
            </div>
        </div>
    )
}