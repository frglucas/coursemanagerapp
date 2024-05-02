import './Icon.style.scss'
import { ICONS } from '../../assets/svgs/index'
import classNames from 'classnames'

type Props = {
    name: keyof typeof ICONS,
    classname?: string
}

export const Icon = ({ name, classname }: Props) => {
    return (
        <div className={classNames(classname)}>
            { ICONS[name] }
        </div>
    )
}