import { api } from "../api"

export const useGetAllCoursesByTermAndPaged = () => {

    const getAllCoursesByTermAndPaged = async (term: string, activeOnly: boolean, page: number, pageSize: number = 10) => {
        const response = await api.get(
            'courses/paged', 
            { 
                params: {
                    term: term,
                    activeOnly: activeOnly,
                    page: page,
                    pageSize: pageSize
                } 
            }
        )

        return response
    }

    return ({
        call: getAllCoursesByTermAndPaged
    })
}