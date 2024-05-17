import classNames from "classnames"
import { SelectOption } from "../../models"

import './Select.style.scss'
import { ChangeEvent } from "react"

type Props = {
    value: string,
    label?: string,
    options: Array<SelectOption>,
    classname?: string,
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

export const Select = ({ value, label, options, classname, onChange }: Props) => {

    return (
        <div className={classNames('select__container', classname)}>
            { label && <label>{ label }</label> }
            <div className={'select__container__content'}>
                <select value={value} onChange={onChange}>
                    <option value="none" selected disabled >Selecione</option>
                    {
                        options.map(({ value, label }, index) => <option key={`select-${index}-${label}`} value={value} >{ label }</option>)
                    }
                </select>
            </div>
        </div>
    )
}