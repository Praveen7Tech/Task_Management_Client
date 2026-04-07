import axios, { type InternalAxiosRequestConfig } from "axios";
import { store } from "../app/store/store";
import { logout, } from "../app/slices/auth.slice";
import { AuthApi } from "./auth.api";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers:{
        "Content-Type": "application/json"
    },
    withCredentials: true
})

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig)=>{
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response)=> response,
    async (error)=>{
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await AuthApi.health();
                // If successful, the backend sent a NEW accessToken cookie
                //  retry the original request
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Refresh token also expired or invalid -> Force Logout
                store.dispatch(logout());
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;