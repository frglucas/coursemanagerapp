import { useContext } from "react"
import { LoaderDataContext } from "../../models"
import { LoaderContext } from "../Loader.context"

export const useLoader = () => {
    const context = useContext<LoaderDataContext>(LoaderContext)

    if (!context) throw new Error('Erro no contexto do loader')

    return context
}