export type AddClientForm = {
    leadId: string | null,
    fullName: string,
    badgeName: string,
    email: string,
    document: string,
    documentType: number,
    birthDate: Date,
    occupationId: string | null,
    isSmoker: boolean,
    genderType: number,
    genderDetail: string,
    indicatorIsCaptivator: boolean,
    indicatorId: string | null,
    captivatorId: string | null
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
    genderDetail: string,
    indicatorId: string,
    captivatorId: string,
    indicatorIsCaptivator: boolean
}

export type SearchClient = {
    id: string,
    name: string,
    email: string,
    isActive: boolean
}

export type ClientBasic = {
    id: string,
    name: string,
    email: string,
    isActive: boolean
}