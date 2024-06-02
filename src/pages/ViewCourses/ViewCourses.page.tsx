import { useState } from "react"
import { useLocation } from "react-router-dom"
import { PATH_ROUTES } from "../../constants"
import { FormViewCourse, Title } from "../../components"
import classNames from "classnames"

import './ViewCourses.style.scss';

export const ViewCourses = () => {
    const location = useLocation()

    const [id, ] = useState<string>(location.pathname.replace(PATH_ROUTES.PRIVATE.VIEW_COURSES.replace(':id', ''), ''))

    return (
        <div className={classNames('view-courses__container')}>
            <Title name='Curso' />
            <FormViewCourse id={id} />
        </div>
    )
}