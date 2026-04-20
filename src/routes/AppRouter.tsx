import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Loading from "../components/custom/Loading";
import { PublicRoute } from "./public.route";
import { ProtectedRoute } from "./protected.route";

const Register = lazy(() => import("../pages/RegisterPage"));
const Login = lazy(() => import("../pages/LoginPage"));
const VerifyOtp = lazy(() => import("../pages/VerifyOtp"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>

          {/* Public */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
          </Route>

          {/* Protected */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Toaster />
    </BrowserRouter>
  );
};

export default AppRouter;