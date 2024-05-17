import classNames from "classnames"
import { ChangeEvent } from "react"

import './RadioCheck.style.scss';
import { RadioOption } from "../../models";

type Props = {
    selected: string,
    label?: string,
    options: Array<RadioOption>,
    classname?: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const RadioCheck = ({ selected, label, options, classname, onChange }: Props) => {

    return (
        <div className={classNames('radio-check__container', classname)}>
            { label && <label>{ label }</label> }
            <div className={'radio-check__container__options'}>
                {
                    options.map(({ label, value }, index) => (
                        <div className={'radio-check__container__options__option'} key={`radio-option-${index}-${label}`}>
                            <label>{ label }</label>
                            <input type="radio" value={value} checked={selected === value} onChange={onChange} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}