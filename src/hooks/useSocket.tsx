import { useSelector } from "react-redux"
import type { RootState } from "../app/store/store"
import { useEffect } from "react"
import { socket } from "../config/socket.io"

export const UseSocket = () =>{
    const user = useSelector((state: RootState)=> state.auth.user)
    console.log("socket called")

   useEffect(() => {
        if (!user?.id) {
            socket.disconnect();
            return;
        }

        socket.connect();
        socket.emit("register", user.id);

        return () => {
            socket.disconnect(); 
        };
    }, [user?.id]);
}