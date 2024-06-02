import { MenuRoute } from "../models";
import { PATH_ROUTES } from "./Path.contants";

export const MENU_ROUTES: Array<MenuRoute> = [
    { 
        name: 'Menu', 
        path: PATH_ROUTES.PRIVATE.DASHBOARD, 
        icon: 'Dashboard' 
    },
    { 
        name: 'Clientes', 
        path: PATH_ROUTES.PRIVATE.SEARCH_CLIENTS, 
        icon: 'Clients'
    },
    { 
        name: 'Cursos', 
        path: PATH_ROUTES.PRIVATE.SEARCH_COURSES, 
        icon: 'Bookmark' 
    },
    { 
        name: 'Turmas', 
        path: PATH_ROUTES.PRIVATE.SEARCH_CLASSES, 
        icon: 'Group'
    },
]