import { api } from "../api"

export const useGetAllClassesByTermAndPaged = () => {

    const getAllClassesByTermAndPaged = async (term: string, page: number, pageSize: number = 10) => {
        const response = await api.get(
            'classes/paged', 
            { 
                params: {
                    term: term,
                    page: page,
                    pageSize: pageSize
                } 
            }
        )

        return response
    }

    return ({
        call: getAllClassesByTermAndPaged
    })
}