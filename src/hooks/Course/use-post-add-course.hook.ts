import { AddCourseForm } from "../../models"
import { api } from "../api"

export const usePostAddCourse = () => {

    const postAddCourse = async (data: AddCourseForm) => {
        const response = await api.post('courses', data)

        return response
    }

    return ({
        call: postAddCourse
    })
}