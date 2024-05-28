import classNames from "classnames"

import './Button.style.scss'

type Props = {
    name: string,
    classname?: string,
    disabled?: boolean,
    onClick: () => void
}

export const Button = ({ name, classname, disabled = false, onClick }: Props) => {
    return (
        <div className={classNames('button-component__container', classname)}>
            <button type={'button'} disabled={disabled} onClick={onClick}>{ name }</button>
        </div>
    )
}