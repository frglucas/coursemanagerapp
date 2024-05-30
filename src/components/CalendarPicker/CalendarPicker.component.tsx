import classNames from "classnames";
import DatePicker from "react-datepicker";

import './CalendarPicker.style.scss';
import { ChangeEvent } from "react";
import { addMinutes, format } from "date-fns";

type Props = {
    value: Date,
    label?: string,
    type?: string,
    classname?: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const CalendarPicker = ({ value, label, type = 'date', classname, onChange }: Props) => {

    const newFormat = (type === 'date') ? "yyyy-MM-dd" : "yyyy-MM-dd'T'HH:mm"

    return (
        <div className={classNames('calendar-picker__container', classname)}>
            { label && <label>{ label }</label> }
            <input 
                type={type}     
                value={format(addMinutes(new Date(value), (new Date(value).getTimezoneOffset())), newFormat)} 
                className={'calendar-picker__container__calendar'} 
                onChange={onChange}
            />
        </div>
    )
}