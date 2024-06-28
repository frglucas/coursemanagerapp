import { ReactNode } from "react"
import classNames from "classnames";
import './Modal.style.scss';
import { ButtonWithIcon } from "../ButtonWithIcon/ButtonWithIcon.component";

type Props = {
    children: ReactNode,
    title?: string,
    classname?: string,
    onClose: () => void
}

export const Modal = ({ children, title, classname, onClose }: Props) => {

    return (
        <div className={classNames('modal__container')}>
            <div className={classNames('modal__container__content', classname)}>
                <div className="modal__container__content__header">
                    <span>{ title }</span>
                    <ButtonWithIcon
                        icon="Close"
                        onClick={onClose}
                        classname="modal__container__content__header__close"
                    />
                </div>
                <div className="modal__container__content__body">
                    { children }
                </div>
            </div>
        </div>
    )
};