import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { closePopup } from "../../store/popupSlice";
import styles from "./ConfirmationPopup.module.scss";
import { removeColumn, removeTask } from "../../store/boardSlice";

const ConfirmationPopup: React.FC = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.board);
  const { isOpen, targetId, type } = useSelector(
    (state: RootState) => state.popup
  );

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      dispatch(closePopup());
    }
  };

  // Закрытие модального окна по нажатию на Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dispatch(closePopup());
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closePopup]);

  const handleConfirm = () => {
    if (type === "column" && targetId) {
      dispatch(removeColumn(targetId.columnId));
    } else if (type === "task" && targetId) {
      dispatch(removeTask(targetId));
    }
    dispatch(closePopup());
  };

  const handleCancel = () => {
    dispatch(closePopup());
  };

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.overlay} ${theme === "dark" ? styles.dark : ""}`}
      onClick={handleOverlayClick}
    >
      <div className={styles.popup}>
        <h3>Вы уверены?</h3>
        <p>
          Вы действительно хотите удалить{" "}
          {type === "column" ? "колонку" : "задачу"}?
        </p>
        <div className={styles.buttons}>
          <button onClick={handleConfirm} className={styles.confirmButton}>
            Удалить
          </button>
          <button onClick={handleCancel} className={styles.cancelButton}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
