import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { auth } from "../firebase";
import { RootState } from "../store";
import {
  loginFinish,
  loginStart,
  loginSuccess,
  logout,
} from "../store/authSlice";

const AuthProvider = () => {
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loginStart());
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          loginSuccess({
            email: user.email,
            token: user.refreshToken,
            id: user.uid,
          })
        );
      } else {
        dispatch(logout());
        navigate("/login", { replace: true });
        dispatch(loginFinish());
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return isLoading ? <Loader /> : <Outlet />;
};

export default AuthProvider;
