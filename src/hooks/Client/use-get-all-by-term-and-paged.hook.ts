import { api } from "../api"

export const useGetAllClientsByTermAndPaged = () => {

    const getAllClientsByTermAndPaged = async (term: string, activeOnly: boolean, page: number, pageSize: number = 10) => {
        const response = await api.get(
            'clients/paged', 
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
        call: getAllClientsByTermAndPaged
    })
}