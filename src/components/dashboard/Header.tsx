import { Link } from "react-router-dom";
import { CheckSquare, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { AuthApi } from "../../api/auth.api";
import { logout } from "../../app/slices/auth.slice";
import toast from "react-hot-toast";
import type { RootState } from "../../app/store/store";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((s: RootState) => s.auth.user);

  const handleLogout = async () => {
    try {
      dispatch(logout());
      await AuthApi.logout();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="border-b border-border bg-card sticky top-0 z-10">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <CheckSquare className="w-4.5 h-4.5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold">TaskFlow</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground hidden sm:inline">
            {user?.name}
          </span>
          <Link to="/login">
            <Button onClick={handleLogout} variant="ghost" size="sm">
              <LogOut className="w-4 h-4 mr-1.5" /> Logout
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
