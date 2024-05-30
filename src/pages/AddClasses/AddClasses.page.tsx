import classNames from 'classnames';
import { FormAddClass, Title } from '../../components';

import './AddClasses.style.scss';

export const AddClasses = () => {

    return (
        <div className={classNames('add-classes__container')}>
            <Title name="Adicionar Turma" />
            <FormAddClass />
        </div>
    )
}