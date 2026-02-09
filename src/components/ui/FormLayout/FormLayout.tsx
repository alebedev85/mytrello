import { ReactNode } from "react";
import styles from "./FormLayout.module.scss";

interface AuthFormLayoutProps {
  title: string;
  onSubmit: () => void;
  children: ReactNode;
}

const AuthFormLayout = ({ title, onSubmit, children }: AuthFormLayoutProps) => {
  return (
    <form
      autoComplete="off"
      onSubmit={onSubmit}
      className={styles.form}
    >
      <div className={styles.formHeader}>
        <h1>{title}</h1>
      </div>

      <div className={styles.formContent}>{children}</div>
    </form>
  );
};

export default AuthFormLayout;
