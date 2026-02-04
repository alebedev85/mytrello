import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styles from "./AuthForm.module.scss";
import { authText } from "./authText";

interface AuthFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  type: "login" | "register";
}

const AuthForm = ({ onSubmit, type }: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.authForm}
    >
      <div className={styles.formHeader}>
        <h1>{authText[type].title}</h1>
      </div>
      <div className={styles.formContent}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">
            <h2>Email:</h2>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="new-password"
            placeholder="Введите Email"
            {...register("email", {
              required: "Email обязателен",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Введите корректный email",
              },
            })}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">
            <h2>Пароль:</h2>
          </label>
          <input
            id="password"
            type="password"
            placeholder="Введите пароль"
            autoComplete="new-password"
            {...register("password", {
              required: "Пароль обязателен",
              minLength: {
                value: 6,
                message: "Пароль должен содержать минимум 6 символа",
              },
            })}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>

        <button className={styles.submitButton} type="submit">
          <h2>{authText[type].buttonText} </h2>
        </button>
        <p className="text-body" style={{ whiteSpace: "nowrap" }}>
          {authText[type].text} <Link to={authText[type].link}>{authText[type].linkText}</Link>
        </p>
      </div>
    </form>
  );
};

export default AuthForm;
