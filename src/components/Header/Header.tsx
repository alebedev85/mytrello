import { FaMoon, FaPlus, FaSun } from "react-icons/fa";
import styles from "./Header.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface HeaderProps {
  onClick: () => void;
  toggleTheme: () => void;
}

export default function Header({ onClick, toggleTheme }: HeaderProps) {
  const {  theme } = useSelector(
    (state: RootState) => state.board
  );
  return (
    <div className={`${styles.header} ${theme === "dark" ? styles.dark : ""}`}>
      <h1 className={styles.title}>Мои задачи</h1>
      <div className={styles.controls}>
        <button onClick={onClick} className={styles.addButton}>
          <FaPlus /> Создать колонку
        </button>
        <button onClick={toggleTheme} className={styles.themeButton}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </div>
    </div>
  );
}
