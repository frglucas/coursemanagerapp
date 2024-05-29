import { api } from "../api"

export const useDeleteCourse = () => {

    const deleteCourse = async (id: string) => {
        const response = await api.delete(`courses/${id}`)

        return response
    }

    return ({
        call: deleteCourse
    })
}