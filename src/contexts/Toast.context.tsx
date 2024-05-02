import { ReactNode, createContext } from "react"
import { ToastContainer } from "react-toastify"

type Props = {
    children: ReactNode
}

const AUTO_CLOSE = 5e3
const TOAST_CONTAINER_LIMIT = 8
const TOAST_CONTAINER_POSITION = 'top-right'

export const ToastContext = createContext<any>({})

export const ToastProvider = ({ children }: Props) => (
    <ToastContext.Provider value={null}>
        { children }
        <ToastContainer 
            rtl={false}
            limit={TOAST_CONTAINER_LIMIT}
            position={TOAST_CONTAINER_POSITION}
            autoClose={AUTO_CLOSE}
            draggable={false}
            closeOnClick={false}
        />
    </ToastContext.Provider>
)
