import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";
import Loader from "../../components/Loader/Loader";
import { RootState } from "../../store";
import { loginFinish, loginStart } from "../../store/authSlice";
import { register as firebaseRegister } from "../../utils/authService";
import styles from "./Register.module.scss";

interface FormData {
  email: string;
  password: string;
}

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.board);
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async ({ email, password }: FormData) => {
    dispatch(loginStart());
    try {
      await firebaseRegister(email, password);
      dispatch(loginFinish());
      navigate("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
      dispatch(loginFinish());
    }
  };

  return (
    <div
      className={`${styles.authPage} ${theme === "dark" ? styles.dark : ""}`}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <AuthForm
          title="Регистрация"
          buttonText="Зарегистрироваться"
          onSubmit={handleRegister}
        />
      )}
      {error && <p className={styles.error}>Ошибка: {error}</p>}
      <p className={styles.link}>
        Уже есть аккаунт? <a href="/login">Войти</a>
      </p>
    </div>
  );
};

export default Register;
