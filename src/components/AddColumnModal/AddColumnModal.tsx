// components/AddColumnModal/AddColumnModal.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { addColumn } from "../../store/boardSlice";
import { closeAddColumnModal } from "../../store/popupSlice";
import FormInput from "../ui/FormInput/FormInput";
import PopupContainer from "../ui/PopupContainer/PopupContainer";
import styles from "./AddColumnModal.module.scss";

const AddColumnModal = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector(
    (state: RootState) => state.popup.addColumnModal,
  );

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
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <PopupContainer>
        <h2>Название колонки</h2>
        <FormInput
          id="columnTitle"
          placeholder="Введите название"
          registerProps={{
            value: newColumnTitle,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setNewColumnTitle(e.target.value),
            onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                handleAddColumn();
              }
            },
          }}
        />
        <div className={styles.modalButtons}>
          <button onClick={handleAddColumn} className="mainButton">
            <h3>Добавить</h3>
          </button>
          <button
            onClick={() => dispatch(closeAddColumnModal())}
            className="mainButton"
          >
            <h3>Отмена</h3>
          </button>
        </div>
      </PopupContainer>
    </div>
  ) : null;
};

export default AddColumnModal;
