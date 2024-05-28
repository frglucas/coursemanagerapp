import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { PATH_ROUTES } from '../../constants';
import classNames from 'classnames';
import { FormEditClient, Title } from '../../components';

import './EditClients.style.scss';

export const EditClients = () => {
    const location = useLocation()

    const [id, ] = useState<string>(location.pathname.replace(PATH_ROUTES.EDIT_CLIENTS.replace(':id', ''), ''))

    return (
        <div className={classNames('edit-clients__container')}>
            <Title name='Editar cliente' />
            <FormEditClient id={id} />
        </div>
    )
}