export const PATH_ROUTES = {
    PUBLIC: {
        SOURCE: '',
        LOGIN: '/login',
        REGISTER: '/register',
        ERROR: '/error',
        OTHERS: '*'
    },
    PRIVATE: {
        DASHBOARD: '/dashboard',
        ADD_CLIENTS: '/clients/add',
        EDIT_CLIENTS: '/clients/edit/:id',
        VIEW_CLIENTS: '/clients/view/:id',
        SEARCH_CLIENTS: '/clients/search',
        ADD_COURSES: '/courses/add',
        EDIT_COURSES: '/courses/edit/:id',
        VIEW_COURSES: '/courses/view/:id',
        SEARCH_COURSES: '/courses/search',
        ADD_CLASSES: '/classes/add',
        VIEW_CLASSES: '/classes/view/:id',
        MANAGE_CLASS: '/classes/manage/:id',
        EDIT_CLASSES: '/classes/edit/:id',
        SEARCH_CLASSES: '/classes/search',
        ADD_LEADS: '/leads/add',
        EDIT_LEADS: '/leads/edit/:id',
        VIEW_LEADS: '/leads/view/:id',
        SEARCH_LEADS: '/leads/search'
    }
}