import classNames from 'classnames';
import './EditLeads.style.scss';
import { FormEditLead, Title } from '../../components';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { PATH_ROUTES } from '../../constants';

export const EditLeads = () => {
    const location = useLocation()

    const [id, ] = useState<string>(location.pathname.replace(PATH_ROUTES.PRIVATE.EDIT_LEADS.replace(':id', ''), ''))

    return (
        <div className={classNames('edit-leads__container')}>
            <Title name='Editar potencial cliente' />
            <FormEditLead id={id} />
        </div>
    )
};