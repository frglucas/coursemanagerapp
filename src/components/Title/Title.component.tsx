import classNames from 'classnames'
import './Title.style.scss'

type Props = {
    name: string,
    classname?: string
}

export const Title = ({ name, classname }: Props) => {
    return (
        <h1 className={classNames('title-component__container', classname)}>{ name }</h1>
    )
}