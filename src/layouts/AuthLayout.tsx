import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";

const AuthLayout = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate(isAuthenticated ? "/board" : "/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <Navigate to="/board" replace /> : <Outlet />;
};

export default AuthLayout;
