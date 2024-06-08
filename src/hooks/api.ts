import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";

type Notification = {
    key: string,
    message: string
}

export const api : AxiosInstance = axios.create({
    baseURL: 'http://localhost:5202/api/v1/',
    headers: { "Content-Type": 'application/json' }
})

export const registerInterceptors = () => {

    api.interceptors.response.use(
        function (response) {
            return response;
        }, function (error) {
            const { response } = error
            toast.error(response.data.message)

            const notifications: Array<Notification> = response.data.notifications
            if (notifications?.length > 0) {
                console.log(notifications)
                notifications.forEach(notification => toast.error(notification.message))
            } else {  }
            
            return Promise.reject(error);
        }
    )
}
