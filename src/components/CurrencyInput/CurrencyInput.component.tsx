import classNames from "classnames"
import { ChangeEvent } from "react"
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

import './CurrencyInput.style.scss'

const defaultMaskOptions = {
    prefix: '',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
    decimalLimit: 2, // how many digits allowed after the decimal
    integerLimit: 7, // limit length of integer numbers
    allowNegative: false,
    allowLeadingZeroes: false,
}

type Props = {
    value: string,
    label?: string,
    type?: 'text' | 'password',
    placeholder?: string,
    classname?: string,
    autocomplete?: boolean,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const CurrencyInput = ({ label, classname, value, onChange }: Props) => {
    const currencyMask = createNumberMask(defaultMaskOptions)
    return (
        <div className={classNames('currency-input-component__container', classname)}>
            { label && <label>{ label }</label> }
            <div className='currency-input-component__container__content'>
                <MaskedInput 
                    mask={currencyMask}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}