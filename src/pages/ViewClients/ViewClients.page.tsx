import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PATH_ROUTES } from '../../constants';

import './ViewClients.style.scss';
import classNames from 'classnames';
import { FormViewClient, Title } from '../../components';

export const ViewClients = () => {
    const location = useLocation()

    const [id, ] = useState<string>(location.pathname.replace(PATH_ROUTES.VIEW_CLIENTS.replace(':id', ''), ''))

    return (
        <div className={classNames('view-clients__container')}>
            <Title name='Cliente' />
            <FormViewClient id={id} />
        </div>
    )
}; 