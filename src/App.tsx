import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import type { RootState } from "./app/store/store";
import { AuthApi } from "./api/auth.api";
import { logout, setCredentials } from "./app/slices/auth.slice";
import Loading from "./components/custom/Loading";
import AppRouter from "./routes/AppRouter";

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = await AuthApi.health();
        dispatch(setCredentials(user.user));
      } catch {
        dispatch(logout());
      }
    };

    initializeAuth();
  }, [dispatch]);

  if (isLoading) return <Loading />;

  return <AppRouter />;
}

export default App;