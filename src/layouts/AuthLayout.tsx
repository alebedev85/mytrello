import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store";

const AuthLayout = () => {
  const isAuthorized = useSelector(
    (state: RootState) => state.auth.isAuthorized,
  );

  return isAuthorized ? <Navigate to="/board" replace /> : <Outlet />;
};

export default AuthLayout;
