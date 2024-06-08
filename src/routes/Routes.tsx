import { Navigate } from "react-router-dom"
import { Wrapped } from "../components"
import { PATH_ROUTES } from "../constants"
import { AddClasses, AddClients, AddCourse, AddLeads, Dashboard, EditClasses, EditClients, EditCourses, EditLeads, Error, Login, Register, SearchClasses, SearchClients, SearchCourses, SearchLeads, ViewClasses, ViewClients, ViewCourses, ViewLeads } from "../pages"

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
        { path: PATH_ROUTES.PRIVATE.DASHBOARD, element: renderPageWithMenu(Dashboard) },
        { path: PATH_ROUTES.PRIVATE.ADD_CLIENTS, element: renderPageWithMenu(AddClients) },
        { path: PATH_ROUTES.PRIVATE.EDIT_CLIENTS, element: renderPageWithMenu(EditClients) },
        { path: PATH_ROUTES.PRIVATE.VIEW_CLIENTS, element: renderPageWithMenu(ViewClients) },
        { path: PATH_ROUTES.PRIVATE.SEARCH_CLIENTS, element: renderPageWithMenu(SearchClients) },
        { path: PATH_ROUTES.PRIVATE.ADD_COURSES, element: renderPageWithMenu(AddCourse) },
        { path: PATH_ROUTES.PRIVATE.EDIT_COURSES, element: renderPageWithMenu(EditCourses) },
        { path: PATH_ROUTES.PRIVATE.VIEW_COURSES, element: renderPageWithMenu(ViewCourses) },
        { path: PATH_ROUTES.PRIVATE.SEARCH_COURSES, element: renderPageWithMenu(SearchCourses) },
        { path: PATH_ROUTES.PRIVATE.ADD_CLASSES, element: renderPageWithMenu(AddClasses) },
        { path: PATH_ROUTES.PRIVATE.VIEW_CLASSES, element: renderPageWithMenu(ViewClasses) },
        { path: PATH_ROUTES.PRIVATE.EDIT_CLASSES, element: renderPageWithMenu(EditClasses) },
        { path: PATH_ROUTES.PRIVATE.SEARCH_CLASSES, element: renderPageWithMenu(SearchClasses) },
        { path: PATH_ROUTES.PRIVATE.SEARCH_LEADS, element: renderPageWithMenu(SearchLeads) },
        { path: PATH_ROUTES.PRIVATE.ADD_LEADS, element: renderPageWithMenu(AddLeads) },
        { path: PATH_ROUTES.PRIVATE.VIEW_LEADS, element: renderPageWithMenu(ViewLeads) },
        { path: PATH_ROUTES.PRIVATE.EDIT_LEADS, element: renderPageWithMenu(EditLeads) },
    ],
    PUBLIC: [
        { path: PATH_ROUTES.PUBLIC.LOGIN, element: renderPageWithoutMenu(Login) },
        { path: PATH_ROUTES.PUBLIC.REGISTER, element: renderPageWithoutMenu(Register) },
        { path: PATH_ROUTES.PUBLIC.ERROR, element: renderPageWithoutMenu(Error) },
        { path: PATH_ROUTES.PUBLIC.SOURCE, element: renderNavigate(PATH_ROUTES.PRIVATE.DASHBOARD) },
        { path: PATH_ROUTES.PUBLIC.OTHERS, element: renderNavigate(PATH_ROUTES.PUBLIC.ERROR) }
    ]
}