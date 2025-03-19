import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const AuthLayout = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return isAuthenticated ? <Navigate to="/board" replace /> : <Outlet />;
};

export default AuthLayout;