export type AddCourseForm = {
    name: string,
    description: string
}

export type EditCourseForm = {
    courseId: string,
    name: string,
    description: string
}

export type SearchCourse = {
    id: string,
    name: string,
    description: string,
    isActive: boolean
}

export type CourseToAddClass = {
    id: string,
    name: string
}