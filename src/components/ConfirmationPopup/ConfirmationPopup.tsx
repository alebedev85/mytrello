import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  clearTasksInColumn,
  removeColumn,
  removeTask,
} from "../../store/boardSlice";
import { closeConfirmationModal } from "../../store/popupSlice";
import PopupContainer from "../ui/PopupContainer/PopupContainer";

import styles from "./ConfirmationPopup.module.scss";

const ConfirmationPopup = () => {
  const dispatch = useDispatch();
  const { isOpen, type, targetId } = useSelector(
    (state: RootState) => state.popup.confirmationModal,
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
      if (targetId.taskId) {
        dispatch(
          removeTask({
            taskId: targetId.taskId,
            columnId: targetId.columnId,
          }),
        );
      }
    } else if (type === "clear-tasks" && targetId) {
      // Очистка колонки
      dispatch(clearTasksInColumn(targetId.columnId));
    }
    dispatch(closeConfirmationModal());
  };

  const confirmationText =
    type === "column"
      ? "удалить колонку"
      : type === "task"
        ? "удалить задачу"
        : type === "clear-tasks"
          ? "очистить колонку"
          : "выполнить действие";

  const capitalize = (str: string) =>
    str ? str[0].toUpperCase() + str.slice(1) : "";

  return isOpen ? (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <PopupContainer>
        <h2>Вы уверены?</h2>
        <p className="text-body">Вы действительно хотите {confirmationText}?</p>
        <div className={styles.buttons}>
          <button onClick={handleConfirm} className="mainButton">
            <h3>{capitalize(confirmationText.split(" ")[0])}</h3>
          </button>
          <button
            onClick={() => dispatch(closeConfirmationModal())}
            className="mainButton"
          >
            <h3>Отмена</h3>
          </button>
        </div>
      </PopupContainer>
    </div>
  ) : null;
};

export default ConfirmationPopup;
