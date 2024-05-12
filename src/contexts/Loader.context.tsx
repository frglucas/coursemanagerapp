import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from "react";
import { LoaderDataContext } from "../models";
import { Loader } from "../components";
import { api, registerInterceptors } from "../hooks";

type Props = {
    children: ReactNode
}

export const LoaderContext = createContext<LoaderDataContext>({} as LoaderDataContext)

export const LoaderProvider = ({ children }: Props) => {
    const [loading, setLoading] = useState<boolean>(false)

    const handleSetLoading = useCallback((value: boolean) => {
        setLoading(value)
    }, [])

    useEffect(() => {
        api.interceptors.request.use(
            function (config) {
                handleSetLoading(true)
                return config;
            }, function (error) {
                handleSetLoading(true)
                return Promise.reject(error);
            }
        )
        api.interceptors.response.use(
            function (response) {
                handleSetLoading(false)
                return response;
            }, function (error) {
                handleSetLoading(false)
                return Promise.reject(error);
            }
        )
        registerInterceptors()
    }, [handleSetLoading])

    const value = useMemo(() => ({ loading, handleSetLoading }), [loading, handleSetLoading])

    return (
        <LoaderContext.Provider value={value}>
            { loading && <Loader /> }
            { children }
        </LoaderContext.Provider>
    )
}