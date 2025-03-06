// components/AddColumnModal/AddColumnModal.tsx
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { closeAddColumnModal } from "../../store/popupSlice";
import { addColumn } from "../../store/boardSlice";
import styles from "./AddColumnModal.module.scss";

const AddColumnModal = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.board);
  const { isOpen } = useSelector((state: RootState) => state.popup.addColumnModal);

  // Состояние для заголовка новой колонки
  const [newColumnTitle, setNewColumnTitle] = useState("");

  // Обработчик клика на обертку (overlay)
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      dispatch(closeAddColumnModal());
    }
  };

  // Закрытие модального окна по нажатию на Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dispatch(closeAddColumnModal());
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, dispatch]);

  // Обработчик добавления новой колонки
  const handleAddColumn = () => {
    if (newColumnTitle.trim()) {
      const newColumn = {
        id: `column-${Date.now()}`,
        title: newColumnTitle,
        taskIds: [],
      };
      dispatch(addColumn(newColumn));
      setNewColumnTitle("");
      dispatch(closeAddColumnModal());
    }
  };

  return isOpen ? (
    <div
      className={`${styles.overlay} ${theme === "dark" ? styles.dark : ""}`}
      onClick={handleOverlayClick}
    >
      <div className={styles.popup}>
        <h2>Add New Column</h2>
        <input
          type="text"
          value={newColumnTitle}
          onChange={(e) => setNewColumnTitle(e.target.value)}
          placeholder="Column title"
          className={styles.input}
          onKeyPress={(e) => e.key === "Enter" && handleAddColumn()}
        />
        <div className={styles.modalButtons}>
          <button onClick={handleAddColumn} className={styles.addButton}>
            Добавить
          </button>
          <button
            onClick={() => dispatch(closeAddColumnModal())}
            className={styles.cancelButton}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default AddColumnModal;