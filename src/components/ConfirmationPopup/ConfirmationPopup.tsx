import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { closeConfirmationModal } from "../../store/popupSlice";
import { removeColumn, removeTask } from "../../store/boardSlice";
import styles from "./ConfirmationPopup.module.scss";

const ConfirmationPopup: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, type, targetId } = useSelector(
    (state: RootState) => state.popup.confirmationModal
  );

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      dispatch(closeConfirmationModal());
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dispatch(closeConfirmationModal());
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  const handleConfirm = () => {
    if (type === "column" && targetId) {
      // Удаляем колонку
      dispatch(removeColumn(targetId.columnId));
    } else if (type === "task" && targetId) {
      // Удаляем задачу
      dispatch(
        removeTask({
          taskId: targetId.taskId,
          columnId: targetId.columnId,
        })
      );
    }
    dispatch(closeConfirmationModal());
  };

  return isOpen ? (
    <div className={styles.overlay} onClick={handleOverlayClick}>
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
          <button
            onClick={() => dispatch(closeConfirmationModal())}
            className={styles.cancelButton}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ConfirmationPopup;
