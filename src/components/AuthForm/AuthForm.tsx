import { useState } from "react";
import styles from "./AuthForm.module.scss";

interface AuthFormProps {
  title: string;
  buttonText: string;
  onSubmit: (email: string, password: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, buttonText, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className={styles.authContainer}>
      <h2 className={styles.title}>{title}</h2>
      <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        <input
          type="password"
          placeholder="Пароль"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password" 
        />
        <button type="submit" className={styles.button}>
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
