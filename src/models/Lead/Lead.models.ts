export type SearchLead = {
    id: string,
    name: string,
    email: string
}

export type AddLeadForm = {
    fullName: string,
    email: string,
    areaCode: string,
    phoneNumber: string,
    observation: string
}