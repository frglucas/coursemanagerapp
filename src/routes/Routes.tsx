import { Navigate } from "react-router-dom"
import { Wrapped } from "../components"
import { PATH_ROUTES } from "../constants"
import { AddClients, AddCourse, Dashboard, EditClients, EditCourses, Error, Login, SearchClients, SearchCourses, ViewClients } from "../pages"

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
        { path: PATH_ROUTES.DASHBOARD, element: renderPageWithMenu(Dashboard) },
        { path: PATH_ROUTES.ADD_CLIENTS, element: renderPageWithMenu(AddClients) },
        { path: PATH_ROUTES.EDIT_CLIENTS, element: renderPageWithMenu(EditClients) },
        { path: PATH_ROUTES.VIEW_CLIENTS, element: renderPageWithMenu(ViewClients) },
        { path: PATH_ROUTES.SEARCH_CLIENTS, element: renderPageWithMenu(SearchClients) },
        { path: PATH_ROUTES.ADD_COURSES, element: renderPageWithMenu(AddCourse) },
        { path: PATH_ROUTES.EDIT_COURSES, element: renderPageWithMenu(EditCourses) },
        { path: PATH_ROUTES.SEARCH_COURSES, element: renderPageWithMenu(SearchCourses) },
    ],
    PUBLIC: [
        { path: PATH_ROUTES.LOGIN, element: renderPageWithoutMenu(Login) },
        { path: PATH_ROUTES.ERROR, element: renderPageWithoutMenu(Error) },
        { path: PATH_ROUTES.SOURCE, element: renderNavigate(PATH_ROUTES.DASHBOARD) },
        { path: PATH_ROUTES.OTHERS, element: renderNavigate(PATH_ROUTES.ERROR) }
    ]
}