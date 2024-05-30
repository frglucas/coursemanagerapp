import { useState } from 'react';
import { FormViewClass, Title } from '../../components';
import { PATH_ROUTES } from '../../constants';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import './ViewClasses.style.scss';

export const ViewClasses = () => {
    const location = useLocation()

    const [id, ] = useState<string>(location.pathname.replace(PATH_ROUTES.VIEW_CLASSES.replace(':id', ''), ''))

    return (
        <div className={classNames('view-classes__container')}>
            <Title name='Turma' />
            <FormViewClass id={id} />
        </div>
    )
};