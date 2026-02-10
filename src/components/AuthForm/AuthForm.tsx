import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import FormInput from "../ui/FormInput/FormInput";
import FormLayout from "../ui/FormLayout/FormLayout";
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
    <FormLayout title={authText[type].title} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputs}>
        <FormInput
          id="email"
          label="Email:"
          type="email"
          placeholder="Введите Email"
          error={errors.email?.message}
          registerProps={register("email", {
            required: "Email обязателен",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Введите корректный email",
            },
          })}
        />

        <FormInput
          id="password"
          label="Пароль:"
          type="password"
          placeholder="Введите пароль"
          error={errors.password?.message}
          registerProps={register("password", {
            required: "Пароль обязателен",
            minLength: {
              value: 6,
              message: "Пароль должен содержать минимум 6 символов",
            },
          })}
        />
      </div>

      <div className={styles.buttons}>
        <button className="mainButton" type="submit">
          <h2>{authText[type].buttonText}</h2>
        </button>

        <p className="text-body" style={{ whiteSpace: "nowrap" }}>
          {authText[type].text}{" "}
          <Link to={authText[type].link}>{authText[type].linkText}</Link>
        </p>
      </div>
    </FormLayout>
  );
};

export default AuthForm;
