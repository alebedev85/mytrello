import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthForm from "../../components/AuthForm/AuthForm";
import { login } from "../../store/authSlice";
import { login as firebaseLogin } from "../../utils/authService";
import { useState } from "react";

import styles from "./Login.module.scss";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async ({ email, password }: FormData) => {
    try {
      const user = await firebaseLogin(email, password);
      dispatch(
        login({
          email: user.email,
          id: user.uid,
          token: await user.getIdToken(),
        })
      );
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.authPage}>
      <AuthForm title="Вход" buttonText="Войти" onSubmit={handleLogin} />
      {error && <p className={styles.error}>Ошибка: {error}</p>}
      <p className={styles.link}>
        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
      </p>
    </div>
  );
};

export default Login;
