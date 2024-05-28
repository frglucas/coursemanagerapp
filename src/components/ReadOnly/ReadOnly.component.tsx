import classNames from 'classnames';
import './ReadOnly.style.scss';

type Props = {
    label?: string,
    value: string,
    classname?: string
}

export const ReadOnly = ({ label, value, classname }: Props) => {

    return (
        <div className={classNames('read-only__container', classname)}>
            { label && <label>{ label }</label> }
            <div className='read-only__container__content'>
                <span>{ value }</span>
            </div>
        </div>
    )
}