import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicRoute } from "./routes/public.route";
import { ProtectedRoute } from "./routes/protected.route";
import Register from "./pages/RegisterPage";

function App() {

  return (
    <BrowserRouter>
       <Routes>
          <Route path="/" element={<PublicRoute><Register/></PublicRoute>}/>
          <Route path="/home" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>

          <Route path="*" element={<NotFound />} />
       </Routes>
       <Toaster />
    </BrowserRouter>
  )
}

export default App
