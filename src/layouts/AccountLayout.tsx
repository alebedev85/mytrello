import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store";

const AccountLayout = () => {
  const isAuthorized = useSelector(
    (state: RootState) => state.auth.isAuthorized,
  );

  return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AccountLayout;
