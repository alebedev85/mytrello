import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthForm from "../../components/AuthForm/AuthForm";
import { login } from "../../store/authSlice";
import styles from "./Login.module.scss";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (email: string, password: string) => {
    dispatch(login({ email, password }));
    navigate("/");
  };

  return (
    <div className={styles.authPage}>
      <AuthForm title="Вход" buttonText="Войти" onSubmit={handleLogin} />
      <p className={styles.link}>
        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
      </p>
    </div>
  );
};

export default Login;