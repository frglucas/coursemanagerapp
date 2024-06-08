import { api } from "../api"

export const useGetAllLeadsByTermAndPaged = () => {

    const getAllLeadsByTermAndPaged = async (term: string, page: number, pageSize: number = 10) => {
        const response = await api.get(
            'leads/paged', 
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
        call: getAllLeadsByTermAndPaged
    })
}