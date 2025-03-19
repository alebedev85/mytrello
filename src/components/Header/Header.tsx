import { FaMoon, FaSun } from "react-icons/fa";
import Logo from "/logo.svg";
import Logo_dark from "/logo_dark.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { toggleTheme } from "../../store/boardSlice";

import styles from "./Header.module.scss";

export default function Header() {
  const { theme } = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();

  return (
    <div className={`${styles.header} ${theme === "dark" ? styles.dark : ""}`}>
      {theme === "dark"? <img className={styles.img} src={Logo_dark} alt="Логотип" />:
      <img className={styles.img} src={Logo} alt="Логотип" />}
      <div className={styles.controls}>
        <button onClick={() => dispatch(toggleTheme())} className={styles.themeButton}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </div>
    </div>
  );
}
