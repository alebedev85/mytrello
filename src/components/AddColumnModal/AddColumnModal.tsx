import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import styles from "./AddColumnModal.module.scss";

interface AddColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  newColumnTitle: string;
  setNewColumnTitle: (value: string) => void;
  handleAddColumn: () => void;
}

const AddColumnModal = ({
  isOpen,
  onClose,
  newColumnTitle,
  setNewColumnTitle,
  handleAddColumn,
}: AddColumnModalProps) => {
  const { theme } = useSelector((state: RootState) => state.board);
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Закрытие модального окна по нажатию на Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  return isOpen ? (
    <div
      className={`${styles.overlay} ${
        theme === "dark" ? styles.dark : ""
      }`}
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
          <button onClick={() => onClose()} className={styles.cancelButton}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default AddColumnModal;
