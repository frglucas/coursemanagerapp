export type UserContext = {
    user?: User
    saveUser(user: User): void
    signOut(): void
}  

export type User = {
    id: string,
    name: string,
    email: string,
    tenantId: string,
    roles: Array<string>
}
