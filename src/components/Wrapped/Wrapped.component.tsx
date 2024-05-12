import { ReactNode, useEffect, useState } from "react"
import { Menu } from "../Menu/Menu.component"

import './Wrapped.style.scss'
import { useAuth } from "../../contexts/use-context/useAuth"
import classNames from "classnames"
import { Icon } from "../Icon/Icon.component"

type Props = {
    children: ReactNode
}

export const Wrapped = ({ children }: Props) => {
    const [ showMenu, setShowMenu ] = useState<boolean>(true)
    const [ isMobile, setIsMobile ] = useState<boolean>(false)

    const resizeScreen = () => {
        if (document.body.offsetWidth > 810) {
            setShowMenu(true)
            setIsMobile(false)
        } else if (document.body.offsetWidth <= 810 && showMenu) {
            setShowMenu(false)
            setIsMobile(true)
        }
    }

    const handleClickMenuButton = () => {
        setShowMenu(lastValue => !lastValue)
    }

    useEffect(() => {
        window.addEventListener('resize', resizeScreen)
        resizeScreen()
    }, [])

    const renderHeader = () => (
        <div className="wrapped-component__container__mobile-header">
            <Icon name="Hat" classname="wrapped-component__container__mobile-header__icon" />
        </div>
    )
    
    return (
        <div className="wrapped-component__container">
            { isMobile && renderHeader() }
            <div className={classNames('wrapped-component__container__menu')}>
                <Menu showMenu={showMenu} isMobile={isMobile} onClickMenuButton={handleClickMenuButton}  />
            </div>
            <div className="wrapped-component__container__content">
                { children }
            </div>
        </div>
    )
}