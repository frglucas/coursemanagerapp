import { ChangeEvent } from 'react';
import { Input } from '../Input/Input.component';
import classNames from 'classnames';
import { ButtonWithIcon } from '../ButtonWithIcon/ButtonWithIcon.component';
import ReactPaginate from 'react-paginate';
import { SearchTableValue } from '../../models';
import { Button } from '../Button/Button.component';
import { Checkbox } from '../Checkbox/Checkbox.component';

import './SearchTable.style.scss';

type Props = {
    headerValues: Array<string>,
    bodyValues: Array<SearchTableValue>,
    classname?: string,
    term: string,
    pageCount: number,
    page: number,
    activeOnly: boolean,
    onRedirectAdd?: () => void,
    onClick: () => void,
    onChangeActiveOnly: (event: any) => void,
    onChangePage: (event: ({ selected: number })) => void,
    onChangeTerm: (event: ChangeEvent<HTMLInputElement>) => void
}

export const SearchTable = ({ headerValues, bodyValues, activeOnly, term, pageCount, page, classname, onRedirectAdd,  onClick, onChangeActiveOnly, onChangePage, onChangeTerm }: Props) => {

    const renderHeader = () => (
        <div className='search-table__container__header'>
            <div className='search-table__container__header__search'>
                <Input value={term} placeholder='Digite algo aqui...' onChange={onChangeTerm} classname='search-table__container__header__search__input' />
                <ButtonWithIcon icon='Search' onClick={onClick} classname='search-table__container__header__search__button' />
            </div>
            <div className='search-table__container__header__options'>
                <Checkbox checked={activeOnly} label='Apenas ativos' onChange={onChangeActiveOnly} classname='search-table__container__header__options__checkbox' />
                { !!onRedirectAdd && <Button name='Adicionar' classname='search-table__container__header__options__button-add' onClick={onRedirectAdd} /> }
            </div>
        </div>
    )

    const renderTableHeader = () => (
        <thead className='search-table__container__table__header'>
            <tr>
                { headerValues.map((value, index) => <th key={`th-${value}-${index}`}>{ value }</th>) }
                <th>Ações</th>
            </tr>
        </thead>
    )

    const renderView = (disabled: boolean, onClick: () => void) => (
        <ButtonWithIcon icon='View' disabled={disabled} onClick={onClick} classname='search-table__container__table__body__actions__view'/>
    )
    
    const renderEdit = (disabled: boolean, onClick: () => void) => (
        <ButtonWithIcon icon='Edit' disabled={disabled} onClick={onClick} classname='search-table__container__table__body__actions__edit'/>
    )
    
    const renderRemove = (disabled: boolean, onClick: () => void) => (
        <ButtonWithIcon icon='Remove' disabled={disabled} onClick={onClick} classname='search-table__container__table__body__actions__remove'/>
    )

    const renderTableBody = () => (
        <tbody className='search-table__container__table__body'>
            { 
                bodyValues.map(({ fields, actions: { canView, canEdit, canRemove, onView, onEdit, onRemove } }, index) => (
                    <tr key={`tr-${index}`}>
                        { fields.map((value, index) => <td key={`td-${index}-${value}`}>{value}</td>) }
                        <td className='search-table__container__table__body__actions'>
                            { renderView(!canView, onView) }
                            { renderEdit(!canEdit, onEdit) }
                            { renderRemove(!canRemove, onRemove) }
                        </td>
                    </tr>
                )) 
            }
        </tbody>
    )

    return (
        <div className={classNames('search-table__container', classname)}>
            { renderHeader() }
            <table className='search-table__container__table'>
                { renderTableHeader() }
                { renderTableBody() }
            </table>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={onChangePage}
                pageRangeDisplayed={3}
                forcePage={page - 1}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName='pagination justify-content-center'
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakLinkClassName='page-link'
                activeClassName='active'    
            />
        </div>
    )
};