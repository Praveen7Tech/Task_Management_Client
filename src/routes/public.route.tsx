import { useSelector } from "react-redux";
import type { RootState } from "../app/store/store";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
};