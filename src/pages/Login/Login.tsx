import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";
import { loginFailure, loginStart, loginSuccess } from "../../store/authSlice";
import { login as firebaseLogin } from "../../utils/authService";

import Loader from "../../components/Loader/Loader";
import { RootState } from "../../store";
import styles from "./Login.module.scss";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async ({ email, password }: FormData) => {
    dispatch(loginStart());
    try {
      const user = await firebaseLogin(email, password);
      dispatch(
        loginSuccess({
          email: user.email,
          id: user.uid,
          token: await user.getIdToken(),
        }),
      );
      navigate("/board");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
      dispatch(loginFailure());
    }
  };

  return (
    <div
      className={styles.authPage}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <AuthForm onSubmit={handleLogin} type={"login"} />
      )}
      {error && <p className={styles.error}>Ошибка: {error}</p>}
    </div>
  );
};

export default Login;
