import { FieldError } from "react-hook-form";
import styles from "./FormInput.module.scss";

interface AuthInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: FieldError;
  registerProps: object;
}

const AuthInput = ({
  id,
  label,
  type = "text",
  placeholder,
  error,
  registerProps,
}: AuthInputProps) => {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id}>
        <h2>{label}</h2>
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete="new-password"
        {...registerProps}
      />

      {error && <p className={styles.error}>{error.message}</p>}
    </div>
  );
};

export default AuthInput;
