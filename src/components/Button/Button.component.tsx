import classNames from "classnames"

import './Button.style.scss'

type Props = {
    name: string,
    classname?: string,
    onClick: () => void
}

export const Button = ({ name, classname, onClick }: Props) => {
    return (
        <div className={classNames('button-component__container', classname)}>
            <button type={'button'} onClick={onClick}>{ name }</button>
        </div>
    )
}