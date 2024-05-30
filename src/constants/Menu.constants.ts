import { MenuRoute } from "../models";
import { PATH_ROUTES } from "./Path.contants";

export const MENU_ROUTES: Array<MenuRoute> = [
    { 
        name: 'Dashboard', 
        path: PATH_ROUTES.DASHBOARD, 
        icon: 'Dashboard' 
    },
    { 
        name: 'Clientes', 
        path: PATH_ROUTES.SEARCH_CLIENTS, 
        icon: 'Clients'
    },
    { 
        name: 'Cursos', 
        path: PATH_ROUTES.SEARCH_COURSES, 
        icon: 'Bookmark' 
    },
    { 
        name: 'Turmas', 
        path: PATH_ROUTES.SEARCH_CLASSES, 
        icon: 'Group'
    },
]