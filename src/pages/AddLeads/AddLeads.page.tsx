import classNames from 'classnames';
import { FormAddLead, Title } from '../../components';
import './AddLeads.style.scss';

export const AddLeads = () => {

    return (
        <div className={classNames('add-leads__container')}>
            <Title name="Adicionar potencial cliente" />
            <FormAddLead />
        </div>
    )
};