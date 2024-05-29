import { api } from "../api"

export const useGetCourseById = () => {

    const getCourseById = async (id: string) => {
        const response = await api.get('courses', { params: { id: id } })

        return response
    }

    return ({
        call: getCourseById
    })
}