import React from "react";
import { useForm } from "react-hook-form";
import styles from "./AuthForm.module.scss";

interface AuthFormProps {
  title: string;
  buttonText: string;
  onSubmit: (data: { email: string; password: string }) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, buttonText, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();

  return (
    <form
      // autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.authForm}
    >
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.inputGroup}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          // autoComplete="off"
          {...register("email", {
            required: "Email обязателен",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Введите корректный email",
            },
          })}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password">Пароль:</label>
        <input
          id="password"
          type="password"
          // autoComplete="new-password" 
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

      <button type="submit" className={styles.submitButton}>
        {buttonText}
      </button>
    </form>
  );
};

export default AuthForm;
