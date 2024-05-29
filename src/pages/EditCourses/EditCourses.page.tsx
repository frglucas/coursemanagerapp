import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { PATH_ROUTES } from '../../constants';
import { FormEditCourse, Title } from '../../components';
import classNames from 'classnames';

import './EditCourses.style.scss';

export const EditCourses = () => {
    const location = useLocation()

    const [id, ] = useState<string>(location.pathname.replace(PATH_ROUTES.EDIT_COURSES.replace(':id', ''), ''))

    return (
        <div className={classNames('edit-courses__container')}>
            <Title name='Editar curso' />
            <FormEditCourse id={id} />
        </div>
    )
};