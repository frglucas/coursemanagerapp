import { ReactNode, createContext, useCallback, useMemo, useState } from "react";
import { ModalDataContext } from "../models";
import { Modal } from "../components";

type Props = {
    children: ReactNode
}

export const ModalContext = createContext<ModalDataContext>({} as ModalDataContext)

export const ModalProvider = ({ children }: Props) => {
    const [show, setShow] = useState<boolean>(false)
    const [content, setContent] = useState<ReactNode | null>(null)
    const [classname, setClassname] = useState<string | undefined>('')
    const [title, setTitle] = useState<string | undefined>('')

    const handleOpenModal = useCallback((contentChildren: ReactNode, title?: string, optinalClassname?: string) => {
        setShow(true)
        setContent(contentChildren)
        setClassname(optinalClassname)
        setTitle(title)
    }, [])

    const handleCloseModal = useCallback(() => {
        setShow(false)
        setContent(null)
        setClassname('')
    }, [])

    const value = useMemo(() => ({ show, handleOpenModal, handleCloseModal }), [show, handleOpenModal, handleCloseModal])

    return (
        <ModalContext.Provider value={value}>
            { show && <Modal title={title} classname={classname} onClose={handleCloseModal}>{ content }</Modal> }
            { children }
        </ModalContext.Provider>
    )
}