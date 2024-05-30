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