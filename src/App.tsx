import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicRoute } from "./routes/public.route";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import VerifyOtp from "./pages/VerifyOtp";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./app/store/store";
import { useEffect } from "react";
import { AuthApi } from "./api/auth.api";
import { logout, setCredentials } from "./app/slices/auth.slice";
import Loading from "./components/custom/Loading";
import { ProtectedRoute } from "./routes/protected.route";
import Dashboard from "./pages/Dashboard";

function App() {

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
  const initializeAuth = async () => {
    try {
      const data = await AuthApi.health();
      console.log("health ", data)
      if (data.id) {
        dispatch(setCredentials(data));
      } else {
        dispatch(logout());
      }
    } catch (err) {
      // On any error (like 401), ensure the state is logged out
      dispatch(logout());
    }
  };
  initializeAuth();
}, [dispatch]);

  if (isLoading) return <Loading/>

  return (
    <BrowserRouter>
       <Routes>
          <Route path="/" element={<PublicRoute><Register/></PublicRoute>}/>
          <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
          <Route path="/verify-otp" element={<PublicRoute><VerifyOtp/></PublicRoute>}/>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>

          <Route path="*" element={<NotFound />} />
       </Routes>
       <Toaster />
    </BrowserRouter>
  )
}

export default App
