import classNames from "classnames"
import { IMAGES } from "../../assets/images"

import './Image.component.scss'

type Props = {
    name: keyof typeof IMAGES,
    alt?: string,
    classname?: string
}

export const Image = ({ name, alt, classname }: Props) => (
    <img src={IMAGES[name]} alt={alt} className={classNames('image-component', classname)}/>
)