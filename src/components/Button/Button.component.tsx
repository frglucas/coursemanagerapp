import classNames from "classnames"

import './Button.style.scss'

type Props = {
    name: string,
    type?: "button" | "submit" | "reset",
    classname?: string,
    disabled?: boolean,
    onClick: () => void
}

export const Button = ({ name, type = 'button', classname, disabled = false, onClick }: Props) => {
    return (
        <div className={classNames('button-component__container', classname)}>
            <button type={type} disabled={disabled} onClick={onClick}>{ name }</button>
        </div>
    )
}