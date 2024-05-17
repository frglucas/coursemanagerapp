import { ICONS } from "../../assets/svgs"

export type MenuItem = {
    name: string,
    path: string,
    icon: keyof typeof ICONS
}

export type MenuRoute = {
    name: string,
    path: string,
    icon: keyof typeof ICONS,
    itens?: Array<MenuItem>
}