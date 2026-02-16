import styles from "./FormTextarea.module.scss";

interface FormTextareaProps {
  id: string;
  placeholder?: string;
  registerProps: object;
}

export default function FormTextarea({ id, placeholder, registerProps }: FormTextareaProps) {
  return (
    <textarea
      id={id}
      className={styles.textarea}
      placeholder={placeholder}
      rows={3}
      {...registerProps}
    />
  );
}
