import { useSelector } from "react-redux"
import type { RootState } from "../app/store/store"
import type { JSX } from "react"
import { Navigate } from "react-router-dom"
import { UseSocket } from "../hooks/useSocket"

export const ProtectedRoute = ({children}: {children: JSX.Element})=>{
    const isAuthenticated = useSelector((state: RootState)=> state.auth.isAuthenticated)
     // connect socket when component mount
    UseSocket()

    return isAuthenticated ? children : <Navigate to={'/'} replace/>
}