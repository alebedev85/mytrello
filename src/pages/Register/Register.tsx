import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";
import { register as firebaseRegister } from "../../utils/authService";

import styles from "./Register.module.scss";
import { useState } from "react";

interface FormData {
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async ({ email, password }: FormData) => {
    try {
      await firebaseRegister(email, password);
      navigate("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.authPage}>
      <AuthForm
        title="Регистрация"
        buttonText="Зарегистрироваться"
        onSubmit={handleRegister}
      />
      {error && <p className={styles.error}>Ошибка: {error}</p>}
      <p className={styles.redirect}>
        Уже есть аккаунт? <a href="/login">Войти</a>
      </p>
    </div>
  );
};

export default Register;
