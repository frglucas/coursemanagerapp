import { useNavigate } from 'react-router-dom';
import { SearchTable, Title } from '../../components';
import { PATH_ROUTES, SEARCH_TABLE_HEADERS } from '../../constants';
import { ChangeEvent, useEffect, useState } from 'react';
import { SearchLead, SearchTableValue } from '../../models';
import { useGetAllLeadsByTermAndPaged } from '../../hooks';

import './SearchLeads.style.scss';

export const SearchLeads = () => {
    const navigate = useNavigate()

    const [term, setTerm] = useState<string>('')
    const [leads, setLeads] = useState<Array<SearchLead>>([])
    const [page, setPage] = useState<number>(1)
    const [pageCount, setPageCount] = useState<number>(1)

    const { call: callGetAllLeadsByTermAndPaged } = useGetAllLeadsByTermAndPaged()

    const getAllLeads = async () => {
        try {
            const { data } = await callGetAllLeadsByTermAndPaged(term, page, 7)

            setPageCount(data.pageCount)
            setLeads(data.data)
        } catch {  }
    }

    useEffect(() => {
        getAllLeads()
    }, [page])

    const handleChangePage = (event: ({ selected: number })) => setPage(event.selected + 1)

    const handleChangeTerm = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setTerm(event.target.value)
    }

    const getLeads = (): Array<SearchTableValue> => {
        return leads.map(({ id, name, email }) => ({
            fields: [name, email],
            actions: {
                canView: true,
                canEdit: true,
                canRemove: false,
                onView: () => navigate(PATH_ROUTES.PRIVATE.VIEW_LEADS.replace(':id', id)),
                onEdit: () => navigate(PATH_ROUTES.PRIVATE.EDIT_LEADS.replace(':id', id)),
                onRemove: () => console.log('onRemove'),
                canRenderView: true,
                canRenderEdit: true,
                canRenderRemove: true
            }
        }))
    }

    return (
        <div className='search-leads__container'>
            <Title name="Buscar Clientes em Potencial" />
            <SearchTable 
                headerValues={SEARCH_TABLE_HEADERS.LEADS} 
                bodyValues={getLeads()}
                term={term}
                page={page}
                pageCount={pageCount} 
                onClick={getAllLeads}
                onChangePage={handleChangePage}
                onChangeTerm={handleChangeTerm}
                onRedirectAdd={() => navigate(PATH_ROUTES.PRIVATE.ADD_LEADS)}
            />
        </div>
    )
};