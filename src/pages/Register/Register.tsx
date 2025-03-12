import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";
import styles from "./Register.module.scss";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (email: string, password: string) => {
    // Тут должен быть вызов API для регистрации
    console.log("Регистрация:", email, password);
    navigate("/login");
  };

  return (
    <div className={styles.authPage}>
      <AuthForm title="Регистрация" buttonText="Зарегистрироваться" onSubmit={handleRegister} />
      <p className={styles.link}>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </p>
    </div>
  );
};

export default Register;
