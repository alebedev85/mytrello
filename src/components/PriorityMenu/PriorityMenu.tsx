import cn from "classnames";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import artistpaletteIcon from "../../assets/icons/artistpalette-icon.svg";
import { changeTaskPriority } from "../../store/boardSlice";
import { Priority } from "../../types";
import { PRIORITY_COLORS } from "../../utils/constants";

import styles from "./PriorityMenu.module.scss";

interface PriorityMenuProps {
  selectedPriority: Priority;
  taskId: string;
}

const PriorityMenu = ({ selectedPriority, taskId }: PriorityMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const priorityButtonRef = useRef<HTMLButtonElement>(null);
  const priorityMenuRef = useRef<HTMLDivElement>(null);

  const handlePriorityChange = (priority: Priority) => {
    dispatch(changeTaskPriority({ taskId, priority }));
    setIsOpen(false);
  };

  // Закрытие priorityMenu при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        priorityMenuRef.current &&
        !priorityMenuRef.current.contains(event.target as Node) &&
        priorityButtonRef.current &&
        !priorityButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.priorityMenuContainer}>
      <button
        ref={priorityButtonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(styles.priorityButton, "tooltip")}
        data-tooltip="Поменять приоритет"
      >
        <img
          className={styles.buttonIcon}
          src={artistpaletteIcon}
          alt="Поменять приоритет"
        />
      </button>

      {isOpen && (
        <div ref={priorityMenuRef} className={styles.dropdown}>
          <button
            className={`${selectedPriority === "high" ? styles.active : ""}`}
            onClick={() => handlePriorityChange("high")}
            style={{ background: PRIORITY_COLORS.high }}
          />
          <button
            className={`${selectedPriority === "medium" ? styles.active : ""}`}
            onClick={() => handlePriorityChange("medium")}
            style={{ background: PRIORITY_COLORS.medium }}
          />
          <button
            className={`${selectedPriority === "low" ? styles.active : ""}`}
            onClick={() => handlePriorityChange("low")}
            style={{ background: PRIORITY_COLORS.low }}
          />
          <button
            className={`${
              selectedPriority === "none" || !selectedPriority
                ? styles.active
                : ""
            }`}
            onClick={() => handlePriorityChange("none")}
            style={{ background: PRIORITY_COLORS.none }}
          />
        </div>
      )}
    </div>
  );
};

export default PriorityMenu;
