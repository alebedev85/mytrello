import { FaMoon, FaSun } from "react-icons/fa";
import Logo from "/logo.svg";
import Logo_dark from "/logo_dark.svg";
import styles from "./Header.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface HeaderProps {
  toggleTheme: () => void;
}

export default function Header({ toggleTheme }: HeaderProps) {
  const { theme } = useSelector((state: RootState) => state.board);
  return (
    <div className={`${styles.header} ${theme === "dark" ? styles.dark : ""}`}>
      {theme === "dark"? <img className={styles.img} src={Logo_dark} alt="Логотип" />:
      <img className={styles.img} src={Logo} alt="Логотип" />}
      <div className={styles.controls}>
        <button onClick={toggleTheme} className={styles.themeButton}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </div>
    </div>
  );
}
