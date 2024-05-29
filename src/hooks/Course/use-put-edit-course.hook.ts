import { EditCourseForm } from "../../models"
import { api } from "../api"

export const usePutEditCourse = () => {

    const putEditCourse = async (data: EditCourseForm) => {
        const response = await api.put('courses', data)

        return response
    }

    return ({
        call: putEditCourse
    })
}