import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/authSlice";
import Loader from "../components/Loader/Loader";

function AuthProvider() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            email: user.email,
            token: user.refreshToken,
            id: user.uid,
          })
        );
      } else {
        dispatch(logout());
        navigate("/login", { replace: true });
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  return <Outlet />;
}

export default AuthProvider;
