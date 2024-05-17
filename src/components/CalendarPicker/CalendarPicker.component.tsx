import classNames from "classnames";
import DatePicker from "react-datepicker";

import './CalendarPicker.style.scss';

type Props = {
    value: Date,
    label?: string,
    dateFormat?: string,
    placeholder?: string,
    classname?: string,
    onChange: (date: Date) => void
}

export const CalendarPicker = ({ value, label, dateFormat = 'dd/MM/yyyy', placeholder, classname, onChange }: Props) => {

    return (
        <div className={classNames('calendar-picker__container')}>
            { label && <label>{ label }</label> }
            <DatePicker
                selected={value} 
                dateFormat={dateFormat}
                placeholderText={placeholder} 
                className={'calendar-picker__container__calendar'} 
                onChange={onChange} 
            />
        </div>
    )
}