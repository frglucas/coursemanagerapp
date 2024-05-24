import classNames from "classnames";
import DatePicker from "react-datepicker";

import './CalendarPicker.style.scss';
import { ChangeEvent } from "react";
import { addMinutes, format } from "date-fns";

type Props = {
    value: Date,
    label?: string,
    classname?: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const CalendarPicker = ({ value, label, classname, onChange }: Props) => {
    return (
        <div className={classNames('calendar-picker__container', classname)}>
            { label && <label>{ label }</label> }
            <input 
                type="date"     
                value={format(addMinutes(new Date(value), (new Date(value).getTimezoneOffset())), 'yyyy-MM-dd')} 
                className={'calendar-picker__container__calendar'} 
                onChange={onChange}
            />
        </div>
    )
}