import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicRoute } from "./routes/public.route";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import VerifyOtp from "./pages/VerifyOtp";

function App() {

  return (
    <BrowserRouter>
       <Routes>
          <Route path="/" element={<PublicRoute><Register/></PublicRoute>}/>
          <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
          <Route path="/verify-otp" element={<VerifyOtp/>}/>

          <Route path="*" element={<NotFound />} />
       </Routes>
       <Toaster />
    </BrowserRouter>
  )
}

export default App
