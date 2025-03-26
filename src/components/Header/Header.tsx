import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { toggleTheme } from "../../store/boardSlice";
import Logo from "/logo.svg";
import Logo_dark from "/logo_dark.svg";

import UserMenu from "../UserMenu/UserMenu";
import styles from "./Header.module.scss";

const Header = () => {
  const { theme } = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();

  return (
    <div className={`${styles.header} ${theme === "dark" ? styles.dark : ""}`}>
      {theme === "dark" ? (
        <img className={styles.img} src={Logo_dark} alt="Логотип" />
      ) : (
        <img className={styles.img} src={Logo} alt="Логотип" />
      )}
      <div className={styles.controls}>
        <UserMenu />
        <button
          onClick={() => dispatch(toggleTheme())}
          className={styles.themeButton}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </div>
    </div>
  );
};

export default Header;
