import { useContext } from "react"
import { ModalDataContext } from "../../models"
import { ModalContext } from "../Modal.context"

export const useModal = () => {
    const context = useContext<ModalDataContext>(ModalContext)

    if (!context) throw new Error('Erro no contexto do modal')

    return context
}