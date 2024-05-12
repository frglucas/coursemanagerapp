import { Navigate } from "react-router-dom"
import { Wrapped } from "../components"
import { PATH_ROUTES } from "../constants"
import { Dashboard, Error, Login } from "../pages"

type PageProps = (props: any) => JSX.Element

const renderPageWithMenu = (Children: PageProps) => (
    <Wrapped>
        <Children />
    </Wrapped>
)

const renderPageWithoutMenu = (Children: PageProps) => ( <Children /> )

const renderNavigate = (path: string) => ( <Navigate to={path} /> )

type RouteProps = {
    path: string,
    element: JSX.Element
}

type RouteTypes = {
    PRIVATE: Array<RouteProps>,
    PUBLIC: Array<RouteProps>
}

export const ROUTES : RouteTypes = {
    PRIVATE: [
        { path: PATH_ROUTES.DASHBOARD, element: renderPageWithMenu(Dashboard) }
    ],
    PUBLIC: [
        { path: PATH_ROUTES.LOGIN, element: renderPageWithoutMenu(Login) },
        { path: PATH_ROUTES.ERROR, element: renderPageWithoutMenu(Error) },
        { path: PATH_ROUTES.SOURCE, element: renderNavigate(PATH_ROUTES.DASHBOARD) },
        { path: PATH_ROUTES.OTHERS, element: renderNavigate(PATH_ROUTES.ERROR) }
    ]
}