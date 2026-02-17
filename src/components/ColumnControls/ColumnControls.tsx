import cn from "classnames";
import { useState } from "react";
import Clean from "../../assets/icons/clean-icon.svg";
import Close from "../../assets/icons/close-icon.svg";
import Plus from "../../assets/icons/plus-icon.svg";
import styles from "./ColumnControls.module.scss";

export default function ColumnControls() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <div className={cn(styles.controlsWrapper, { [styles.open]: isMenuOpen })}>
      {/* Панель */}
      <div
        className={styles.controls}
      >
        <button
          // onClick={toggleAddTask}
          className={cn(styles.columnButton, "tooltip")}
          data-tooltip="Новая задача"
        >
          <img className={styles.buttonIcon} src={Plus} alt="" />
        </button>

        <button
          data-tooltip="Очистить колонку"
          className={cn(styles.columnButton, styles.clearButton, "tooltip")}
          // onClick={handleClearColumn}
        >
          <img className={styles.buttonIcon} src={Clean} alt="" />
        </button>

        <button
          // onClick={handleDeleteColumn}
          data-tooltip="Удалить колонку"
          className={cn(styles.columnButton, styles.deleteButton, "tooltip")}
        >
          <img className={styles.buttonIcon} src={Close} alt="" />
        </button>
      </div>
      {/* Бургер */}
      <button
        className={cn(styles.burger, { [styles.open]: isMenuOpen })}
        onClick={toggleMenu}
        aria-label="Открыть меню"
      >
        <span />
        <span />
        <span />
      </button>
    </div>
  );
}
