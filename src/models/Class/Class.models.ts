export type SearchClass = {
    id: string,
    name: string,
    course: string,
    scheduleDate: Date,
    isOnline: boolean
}

export type AddClassForm = {
    courseId: string,
    ministerId: string,
    name: string,
    addressOrLink: string,
    scheduledDate: Date,
    isOnline: boolean
}

export type EditClassForm = {
    classId: string,
    courseId: string,
    ministerId: string,
    name: string,
    scheduledDate: Date,
    addressOrLink: string,
    isOnline: boolean
}