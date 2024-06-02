import { useLocation } from 'react-router-dom';
import './EditClasses.style.scss';
import { useState } from 'react';
import { PATH_ROUTES } from '../../constants';
import classNames from 'classnames';
import { FormEditClass, Title } from '../../components';

export const EditClasses = () => {
    const location = useLocation()

    const [id, ] = useState<string>(location.pathname.replace(PATH_ROUTES.PRIVATE.EDIT_CLASSES.replace(':id', ''), ''))

    return (
        <div className={classNames('edit-classes__container')}>
            <Title name='Editar turma' />
            <FormEditClass id={id} />
        </div>
    )
};