import {io} from "socket.io-client"

const BACKEND_API = import.meta.env.VITE_API_URL

export const socket = io(BACKEND_API,{
    withCredentials: true,
    autoConnect: false
})