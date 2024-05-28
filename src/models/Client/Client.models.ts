export type AddClientForm = {
    fullName: string,
    badgeName: string,
    email: string,
    document: string,
    documentType: number,
    birthDate: Date,
    occupationId: string,
    isSmoker: boolean,
    genderType: number,
    genderDetail: string
}

export type EditClientForm = {
    clientId: string,
    fullName: string,
    badgeName: string,
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