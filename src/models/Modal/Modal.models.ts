import { ReactNode } from "react"

export type ModalDataContext = {
    show: boolean,
    handleOpenModal(contentChildren: ReactNode, title?: string, optionalClassname?: string): void,
    handleCloseModal(): void,
}