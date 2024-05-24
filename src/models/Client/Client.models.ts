export type AddClientForm = {
    fullName: string,
    email: string,
    document: string,
    documentType: number,
    birthDate: Date,
    occupationId: string,
    isSmoker: boolean,
    genderType: number,
    genderDetail: string
}

export type SearchClient = {
    id: string,
    name: string,
    email: string,
    isActive: boolean
}