import { ChangeEvent, useEffect, useState } from 'react';
import { SearchTable, Title } from '../../components';
import './SearchClients.style.scss';
import { useDeleteClient, useGetAllClientsByTermAndPaged } from '../../hooks';
import { SearchClient, SearchTableValue } from '../../models';
import { PATH_ROUTES, SEARCH_TABLE_HEADERS } from '../../constants';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const SearchClients = () => {
    const navigate = useNavigate()

    const [term, setTerm] = useState<string>('')
    const [clients, setClients] = useState<Array<SearchClient>>([])
    const [activeOnly, setActiveOnly] = useState<boolean>(true)
    const [page, setPage] = useState<number>(1)
    const [pageCount, setPageCount] = useState<number>(1)

    const { call: callGetAllClientsByTermAndPaged } = useGetAllClientsByTermAndPaged()
    const { call: callDeleteClient } = useDeleteClient()

    const getAllClients = async () => {
        try {
            const { data } = await callGetAllClientsByTermAndPaged(term, activeOnly, page, 7)

            setPageCount(data.pageCount)
            setClients(data.data)
        } catch {  }
    }

    useEffect(() => {
        getAllClients()
    }, [page, activeOnly])

    const deleteClient = async (id: string) => {
        
            const { data } = await callDeleteClient(id)

            toast.success(data.message)
            getAllClients()
    }

    const handleChangePage = (event: ({ selected: number })) => setPage(event.selected + 1)

    const handleChangeActiveOnly = (event: any) => {
        setPage(1)
        setActiveOnly(lastValue => !lastValue)
    }

    const handleChangeTerm = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setTerm(event.target.value)
    }

    const getClients = (): Array<SearchTableValue> => {
        return clients.map(({ id, name, email, isActive }) => ({
            fields: [(isActive ? name : `${name} (INATIVO)`), email],
            actions: {
                canView: true,
                canEdit: isActive,
                canRemove: isActive,
                onView: () => navigate(PATH_ROUTES.PRIVATE.VIEW_CLIENTS.replace(':id', id)),
                onEdit: () => navigate(PATH_ROUTES.PRIVATE.EDIT_CLIENTS.replace(':id', id)),
                onRemove: () => deleteClient(id),
                canRenderView: true,
                canRenderEdit: true,
                canRenderRemove: true
            }
        }))
    }

    return (
        <div className='search-clients__container'>
            <Title name='Buscar clientes' />
            <SearchTable 
                headerValues={SEARCH_TABLE_HEADERS.CLIENTS} 
                bodyValues={getClients()}
                activeOnly={activeOnly}
                term={term}
                page={page}
                pageCount={pageCount} 
                onClick={getAllClients} 
                onChangeActiveOnly={handleChangeActiveOnly}
                onChangePage={handleChangePage}
                onChangeTerm={handleChangeTerm}
                onRedirectAdd={() => navigate(PATH_ROUTES.PRIVATE.ADD_CLIENTS)}
            />
        </div>
    )
};