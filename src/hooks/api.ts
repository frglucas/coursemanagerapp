import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";

type Notification = {
    key: string,
    message: string
}

const getInstance = () => {
    const instance = axios.create({
        baseURL: 'http://localhost:5202/api/v1',
        headers: { "Content-Type": 'application/json' }
    })

    instance.interceptors.response.use(
        function (response) {
            return response;
        }, function (error) {
            const { response } = error
            toast.error(response.data.message)

            const notifications: Array<Notification> = response.data.notifications
            if (notifications.length > 0) {
                notifications.forEach(notification => toast.error(notification.message))
            }
            
            return Promise.reject(error);
        }
    )

    return instance
}

export const api: AxiosInstance = getInstance()
