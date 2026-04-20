import { useSelector } from "react-redux";
import type { RootState } from "../app/store/store";
import { Navigate, Outlet } from "react-router-dom";
import { UseSocket } from "../hooks/useSocket";

export const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  UseSocket();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};