import styles from "./FormInput.module.scss";

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  registerProps: object;
}

const FormInput = ({
  id,
  label,
  type = "text",
  placeholder,
  error,
  registerProps,
}: FormInputProps) => {
  return (
    <div className={styles.inputGroup}>
      {label && (
        <label htmlFor={id}>
          <h2>{label}</h2>
        </label>
      )}

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete="new-password"
        {...registerProps}
      />

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default FormInput;
