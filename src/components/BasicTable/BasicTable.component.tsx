import classNames from 'classnames';
import './BasicTable.style.scss';
import { ButtonWithIcon } from '../ButtonWithIcon/ButtonWithIcon.component';
import { BasicTableValue } from '../../models';

type Props = {
    headerValues: Array<string>,
    bodyValues: Array<BasicTableValue>
}

export const BasicTable = ({ headerValues, bodyValues }: Props) => {

    const renderTableHeader = () => (
        <thead className='basic-table__container__table__header'>
            <tr>
                { headerValues.map((value, index) => <th key={`th-${value}-${index}`}>{ value }</th>) }
                <th>Ações</th>
            </tr>
        </thead>
    )

    const renderView = (disabled: boolean, onClick: () => void) => (
        <ButtonWithIcon icon='View' disabled={disabled} onClick={onClick} classname='basic-table__container__table__body__actions__view'/>
    )
    
    const renderEdit = (disabled: boolean, onClick: () => void) => (
        <ButtonWithIcon icon='Edit' disabled={disabled} onClick={onClick} classname='basic-table__container__table__body__actions__edit'/>
    )
    
    const renderRemove = (disabled: boolean, onClick: () => void) => (
        <ButtonWithIcon icon='Remove' disabled={disabled} onClick={onClick} classname='basic-table__container__table__body__actions__remove'/>
    )
    
    const renderAccept = (disabled: boolean, onClick: () => void) => (
        <ButtonWithIcon icon='Check' disabled={disabled} onClick={onClick} classname='basic-table__container__table__body__actions__accept'/>
    )

    const renderTableBody = () => (
        <tbody className='basic-table__container__table__body'>
            { 
                bodyValues.map(({ fields, actions: { canView, canEdit, canRemove, canAccept, onView, onEdit, onRemove, onAccept, canRenderView, canRenderEdit, canRenderRemove, canRenderAccept } }, index) => (
                    <tr key={`tr-${index}`} className={classNames({ 'background-trans__blue': ((index % 2) !== 0)})}>
                        { fields.map((value, index) => <td key={`td-${index}-${value}`}>{value}</td>) }
                        <td className='search-table__container__table__body__actions'>
                            {  canRenderView && renderView(!canView, onView) }
                            {  canRenderEdit && renderEdit(!canEdit, onEdit) }
                            {  canRenderAccept && renderAccept(!canAccept, onAccept) }
                            {  canRenderRemove && renderRemove(!canRemove, onRemove) }
                        </td>
                    </tr>
                )) 
            }
        </tbody>
    )

    return (
        <div className={classNames('basic-table__container')}>
            <table className='basic-table__container__table'>
                { renderTableHeader() }
                { renderTableBody() }
            </table>
        </div>
    )
};