// components/PriorityMenu/PriorityMenu.tsx
import React, { useState, useRef, useEffect } from "react";
import { PRIORITY_COLORS } from "../../utils/constants";
import { Priority } from "../../types";
import styles from "./PriorityMenu.module.scss";
import { FaFlag } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { changeTaskPriority } from "../../store/boardSlice";

interface PriorityMenuProps {
  selectedPriority: Priority;
  taskId: string;
}

const PriorityMenu: React.FC<PriorityMenuProps> = ({
  selectedPriority,
  taskId,
}) => {
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
        className={`${styles.priorityButton} tooltip`}
        data-tooltip="Поменять приоритет"
      >
        <FaFlag />
      </button>

      {isOpen && (
        <div ref={priorityMenuRef} className={styles.dropdown}>
          <button
            className={`${selectedPriority === "high" ? styles.active : ""}`}
            onClick={() => handlePriorityChange("high")}
            style={{ backgroundColor: PRIORITY_COLORS.high }}
          />
          <button
            className={`${selectedPriority === "medium" ? styles.active : ""}`}
            onClick={() => handlePriorityChange("medium")}
            style={{ backgroundColor: PRIORITY_COLORS.medium }}
          />
          <button
            className={`${selectedPriority === "low" ? styles.active : ""}`}
            onClick={() => handlePriorityChange("low")}
            style={{ backgroundColor: PRIORITY_COLORS.low }}
          />
          <button
            className={`${selectedPriority === "none" || !selectedPriority ? styles.active : ""}`}
            onClick={() => handlePriorityChange("none")}
            style={{ backgroundColor: PRIORITY_COLORS.none }}
          />
        </div>
      )}
    </div>
  );
};

export default PriorityMenu;
