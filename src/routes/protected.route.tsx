import { useSelector } from "react-redux"
import type { RootState } from "../app/store/store"
import type { JSX } from "react"
import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({children}: {children: JSX.Element})=>{
    const isAuthenticated = useSelector((state: RootState)=> state.auth.isAuthenticated)

    return isAuthenticated ? children : <Navigate to={'/'} replace/>
}