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
        path: '', 
        icon: 'Bookmark',
        itens: [
            {
                name: 'Consultar',
                path: 'courses/search',
                icon: 'BookmarkSearch'
            },
            {
                name: 'Adicionar',
                path: 'courses/add',
                icon: 'BookmarkAdd'
            },
            {
                name: 'Remover',
                path: 'courses/remove',
                icon: 'BookmarkRemove'
            },
            {
                name: 'Editar',
                path: 'courses/edit',
                icon: 'BookmarkEdit'
            },
        ] 
    },
    { 
        name: 'Turmas', 
        path: '', 
        icon: 'Group',
        itens: [
            {
                name: 'Consultar',
                path: 'classes/search',
                icon: 'GroupSearch'
            },
            {
                name: 'Adicionar',
                path: 'classes/add',
                icon: 'GroupAdd'
            },
            {
                name: 'Remover',
                path: 'classes/remove',
                icon: 'GroupRemove'
            },
            {
                name: 'Editar',
                path: 'classes/edit',
                icon: 'GroupEdit'
            },
        ] 
    },
]