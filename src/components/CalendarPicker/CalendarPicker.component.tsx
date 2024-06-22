import classNames from "classnames";

import './CalendarPicker.style.scss';
import { ChangeEvent } from "react";
import { addMinutes, addYears, format } from "date-fns";

type Props = {
    value: Date,
    label?: string,
    type?: string,
    classname?: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const CalendarPicker = ({ value, label, type = 'date', classname, onChange }: Props) => {

    const newFormat = (type === 'date') ? "yyyy-MM-dd" : "yyyy-MM-dd'T'HH:mm"

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.value || event.target.value === '') 
            event.target.value = '0001-01-01'
        
        onChange(event)
    }

    return (
        <div className={classNames('calendar-picker__container', classname)}>
            { label && <label>{ label }</label> }
            <input 
                type={type}     
                value={format(addMinutes(new Date(value), (new Date(value).getTimezoneOffset())), newFormat)} 
                className={'calendar-picker__container__calendar'} 
                onChange={handleChange}
                min={'0001-01-01T00:00'}
                max={format(new Date(), 'yyyy-MM-dd')}
                onKeyDown={(e) => e.preventDefault()}
                inputMode="none"
            />
        </div>
    )
}