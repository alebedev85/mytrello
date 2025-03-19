import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginFinish,loginSuccess, logout } from "../store/authSlice";
import Loader from "../components/Loader/Loader";
import { RootState } from "../store";

function AuthProvider() {
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

  return isLoading? <Loader /> :<Outlet />;
}

export default AuthProvider;
