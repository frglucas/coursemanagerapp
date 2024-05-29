import { useNavigate } from 'react-router-dom';
import { SearchTable, Title } from '../../components';
import { PATH_ROUTES, SEARCH_TABLE_HEADERS } from '../../constants';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDeleteCourse, useGetAllCoursesByTermAndPaged } from '../../hooks';
import { SearchCourse, SearchTableValue } from '../../models';
import { toast } from 'react-toastify';

import './SearchCourses.style.scss';

export const SearchCourses = () => {
    const navigate = useNavigate()
    
    const [term, setTerm] = useState<string>('')
    const [courses, setCourses] = useState<Array<SearchCourse>>([])
    const [activeOnly, setActiveOnly] = useState<boolean>(true)
    const [page, setPage] = useState<number>(1)
    const [pageCount, setPageCount] = useState<number>(1)

    const { call: callGetAllCoursesByTermAndPaged } = useGetAllCoursesByTermAndPaged()
    const { call: callDeleteCourse } = useDeleteCourse()

    const getAllCourses = async () => {
        try {
            const { data } = await callGetAllCoursesByTermAndPaged(term, activeOnly, page, 7)

            setPageCount(data.pageCount)
            setCourses(data.data)
        } catch {  }
    }

    useEffect(() => {
        getAllCourses()
    }, [page, activeOnly])

    const deleteCourse = async (id: string) => {
        
        const { data } = await callDeleteCourse(id)

        toast.success(data.message)
        getAllCourses()
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

    const getCourses = (): Array<SearchTableValue> => {
        return courses.map(({ id, name, isActive }) => ({
            fields: [(isActive ? name : `${name} (INATIVO)`)],
            actions: {
                canView: true,
                canEdit: isActive,
                canRemove: isActive,
                onView: () => navigate(PATH_ROUTES.VIEW_COURSES.replace(':id', id)),
                onEdit: () => navigate(PATH_ROUTES.EDIT_COURSES.replace(':id', id)),
                onRemove: () => deleteCourse(id)
            }
        }))
    }

    return (
        <div className='search-courses__container'>
            <Title name='Buscar cursos' />
            <SearchTable 
                headerValues={SEARCH_TABLE_HEADERS.COURSES} 
                bodyValues={getCourses()}
                activeOnly={activeOnly}
                term={term}
                page={page}
                pageCount={pageCount} 
                onClick={getAllCourses} 
                onChangeActiveOnly={handleChangeActiveOnly}
                onChangePage={handleChangePage}
                onChangeTerm={handleChangeTerm}
                onRedirectAdd={() => navigate(PATH_ROUTES.ADD_COURSES)}
            />
        </div>
    )
};