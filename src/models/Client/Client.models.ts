export type AddClientForm = {
    name: string,
    email: string,
    document: string,
    documentType: number,
    birthDate: Date,
    occupationId: string,
    isSmoker: boolean,
    genderType: number,
    genderDetail: string
}