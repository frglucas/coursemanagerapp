export type User = {
    id: string,
    name: string,
    email: string,
    tenantId: string,
    roles: Array<string>
}

export type UserBasic = {
    id: string,
    name: string,
    email: string
}