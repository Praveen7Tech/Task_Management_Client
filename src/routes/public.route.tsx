import type { JSX } from "react";
import type { RootState } from "../app/store/store";
import { useSelector} from "react-redux"
import { Navigate } from "react-router-dom";

export const PublicRoute = ({children}:{ children : JSX.Element})=>{
    const isAuthenticated = useSelector((state: RootState)=> state.auth.isAuthenticated)

    return !isAuthenticated ? children : <Navigate to='/dashboard' replace/>
}