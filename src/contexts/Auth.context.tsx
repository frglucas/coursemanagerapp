import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from "react"
import { LoginForm, User, AuthDataContext } from "../models"
import { useLocation, useNavigate } from "react-router-dom"
import { usePostLogin, api, useGetUser } from "../hooks"
import { PATH_ROUTES } from "../constants"

type Props = {
    children: ReactNode
}

export const AuthContext = createContext<AuthDataContext>({} as AuthDataContext)

export const AuthProvider = ({ children }: Props) => {
    const location = useLocation()
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(sessionStorage.getItem('token'))
    const navigate = useNavigate()

    const { call: callPostLogin } = usePostLogin()
    const { call: callGetUser } = useGetUser()

    const updateUser = async () => {
        try {
            if (!token)
                throw new Error('Token não identificado');

            const { data } = await callGetUser()

            if (data) {
                const responseUser: User = {
                    id: data.data.id,
                    name: data.data.name,
                    email: data.data.email,
                    tenantId: data.data.tenantId,
                    roles: data.data.roles,
                }

                setUser(responseUser)

                sessionStorage.setItem('user', JSON.stringify(responseUser))
            }
        } catch (error) {
            signOut()
        }
    }

    const signIn = async (form: LoginForm) => {
        try {
            const { data } = await callPostLogin(form);

            if (data) {
                const newToken = data.data.token

                const responseUser: User = {
                    id: data.data.id,
                    name: data.data.name,
                    email: data.data.email,
                    tenantId: data.data.tenantId,
                    roles: data.data.roles,
                }

                setUser(responseUser)
                
                setToken(newToken)

                sessionStorage.setItem('token', newToken);
                
                api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`

                navigate(PATH_ROUTES.PRIVATE.DASHBOARD);
                
                return;
            }
        } catch (err) {
            console.error(err);
            signOut()
        }
    }

    const signOut = useCallback(() => {
        api.defaults.headers.common['Authorization'] = null
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        setUser(null);
        setToken(null);
        
        const test = Object.values(PATH_ROUTES.PUBLIC).filter(x => x === location.pathname)
        
        if (test.length === 1) navigate(location.pathname, { state: { isSignOut: true } })
        else navigate("/login", { state: { isSignOut: true } });
    }, [navigate])

    useEffect(() => {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        updateUser()
    }, [token])

    const dataContext = useMemo(() => ({ user, signIn, signOut, token }), [ user, signIn, signOut, token ])

    return (
        <AuthContext.Provider value={dataContext}>
            { children }
        </AuthContext.Provider>
    )
}
