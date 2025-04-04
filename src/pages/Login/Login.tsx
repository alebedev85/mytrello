import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
  const { theme } = useSelector((state: RootState) => state.board);
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
        })
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
      className={`${styles.authPage} ${theme === "dark" ? styles.dark : ""}`}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <AuthForm title="Вход" buttonText="Войти" onSubmit={handleLogin} />
      )}
      {error && <p className={styles.error}>Ошибка: {error}</p>}
      <p className={styles.link}>
        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
      </p>
    </div>
  );
};

export default Login;
