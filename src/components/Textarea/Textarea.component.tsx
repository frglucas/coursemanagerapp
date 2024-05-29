import classNames from "classnames"
import { ChangeEvent } from "react"

import './Textarea.style.scss';

type Props = {
    value: string,
    label?: string,
    maxLength?: number,
    placeholder?: string,
    classname?: string,
    autocomplete?: boolean,
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

export const Textarea = ({ value, label, maxLength = 512, placeholder, classname, autocomplete = false, onChange }: Props) => {

    return (
        <div className={classNames('textarea-component__container', classname)}>
            { label && <label>{ label }</label> }
            <div className='textarea-component__container__content'>
                <textarea maxLength={maxLength} rows={8} value={value} placeholder={placeholder} onChange={onChange} autoComplete={autocomplete ? 'on' : 'off'}></textarea>
            </div>
        </div>
    )
};