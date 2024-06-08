import classNames from 'classnames';
import { FormViewLead, Title } from '../../components';
import './ViewLeads.style.scss';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { PATH_ROUTES } from '../../constants';

export const ViewLeads = () => {
    const location = useLocation()

    const [id, ] = useState<string>(location.pathname.replace(PATH_ROUTES.PRIVATE.VIEW_LEADS.replace(':id', ''), ''))

    return (
        <div className={classNames('view-leads__container')}>
            <Title name='Potencial cliente' />
            <FormViewLead id={id} />
        </div>
    )
};