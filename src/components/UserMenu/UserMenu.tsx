import { useEffect, useRef, useState } from "react";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import { RootState } from "../../store";
import { logout } from "../../store/authSlice";
import styles from "./UserMenu.module.scss";

const UserMenu = () => {
  const { theme } = useSelector((state: RootState) => state.board);
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Полный разлогин
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Разлогиниваем пользователя в Firebase
      dispatch(logout()); // Очищаем Redux store
      setMenuOpen(false); // Закрываем меню
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  if (!isAuthenticated) return null; // Если пользователя нет, не отображаем меню

  return (
    <div
      ref={menuRef}
      className={`${styles.userMenu} ${theme === "dark" ? styles.dark : ""}`}
    >
      <button
        className={styles.userButton}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FaUserCircle className={styles.userIcon} />
        <span className={styles.userEmail}>{user.email}</span>
      </button>

      <div className={`${styles.dropdownMenu} ${menuOpen ? styles.open : ""}`}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          <FaSignOutAlt /> Выйти
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
