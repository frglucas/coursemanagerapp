import { LoginForm } from "../Login/Login.model"
import { User } from "../User/User.model"

export type AuthDataContext = {
    user: User | null
    signIn: (form: LoginForm) => void
    signOut(): void
    token: string | null
} 