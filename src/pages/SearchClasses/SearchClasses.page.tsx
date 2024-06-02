import { useNavigate } from "react-router-dom";
import { SearchTable, Title } from "../../components"
import { PATH_ROUTES, SEARCH_TABLE_HEADERS } from "../../constants";
import { ChangeEvent, useEffect, useState } from "react";
import { SearchClass, SearchTableValue } from "../../models";
import { useGetAllClassesByTermAndPaged } from "../../hooks";
import { format } from "date-fns";

import './SearchClasses.style.scss';

export const SearchClasses = () => {
    const navigate = useNavigate()

    const [term, setTerm] = useState<string>('')
    const [classes, setClasses] = useState<Array<SearchClass>>([])
    const [page, setPage] = useState<number>(1)
    const [pageCount, setPageCount] = useState<number>(1)

    const { call: callGetAllClassesByTermAndPaged } = useGetAllClassesByTermAndPaged()

    const getAllClasses = async () => {
        try {
            const { data } = await callGetAllClassesByTermAndPaged(term, page, 7)

            setPageCount(data.pageCount)
            setClasses(data.data)
        } catch {  }
    }

    useEffect(() => {
        getAllClasses()
    }, [page])

    const handleChangePage = (event: ({ selected: number })) => setPage(event.selected + 1)

    const handleChangeTerm = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setTerm(event.target.value)
    }

    const getClasses = (): Array<SearchTableValue> => {
        return classes.map(({ id, name, course, scheduleDate }) => ({
            fields: [name, format(scheduleDate, 'dd/MM/yyyy')],
            actions: {
                canView: true,
                canEdit: true,
                canRemove: false,
                onView: () => navigate(PATH_ROUTES.PRIVATE.VIEW_CLASSES.replace(':id', id)),
                onEdit: () => navigate(PATH_ROUTES.PRIVATE.EDIT_CLASSES.replace(':id', id)),
                onRemove: () => null,
                canRenderView: true,
                canRenderEdit: true,
                canRenderRemove: false
            }
        }))
    }

    return (
        <div className='search-classes__container'>
            <Title name="Buscar Turmas" />
            <SearchTable 
                headerValues={SEARCH_TABLE_HEADERS.CLASSES} 
                bodyValues={getClasses()}
                term={term}
                page={page}
                pageCount={pageCount} 
                onClick={getAllClasses}
                onChangePage={handleChangePage}
                onChangeTerm={handleChangeTerm}
                onRedirectAdd={() => navigate(PATH_ROUTES.PRIVATE.ADD_CLASSES)}
            />
        </div>
    )
};