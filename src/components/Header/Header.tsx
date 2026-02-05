import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { toggleTheme } from "../../store/boardSlice";
import Logo from "../../assets/logo.svg";
import Moon from "../../assets/icons/moon-icon.svg";
import Sun from "../../assets/icons/sun-icon.svg";

import UserMenu from "../UserMenu/UserMenu";
import styles from "./Header.module.scss";

const Header = () => {
  const { theme } = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();

  return (
    <div className={styles.header}>
      <img className={styles.img} src={Logo} alt="Логотип" />

      <div className={styles.controls}>
        <UserMenu />
        <button
          onClick={() => dispatch(toggleTheme())}
          className={styles.themeButton}
        >
          <img
            className={styles.themeLogo}
            src={theme === "light" ? Moon : Sun}
            alt="Светлая тема"
          />
        </button>
      </div>
    </div>
  );
};

export default Header;
