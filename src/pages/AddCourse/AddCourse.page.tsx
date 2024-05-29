import classNames from 'classnames';
import { FormAddCourse, Title } from '../../components';

import './AddCourse.style.scss';

export const AddCourse = () => {
    
    return (
        <div className={classNames('add-courses__container')}>
            <Title name="Adicionar curso" />
            <FormAddCourse />
        </div>
    )
};