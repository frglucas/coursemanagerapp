import { api } from "../api"

export const useGetAllCourses = () => {

    const getAllCourses = async () => {
        const response = await api.get('courses/all')

        return response
    }

    return ({
        call: getAllCourses
    })
}