import { ReactNode } from "react";
import Close from "../../../assets/icons/close-icon.svg";
import styles from "./PopupContainer.module.scss";

interface PopupContainerProps {
  children: ReactNode;
  onClose: () => void;
}

const PopupContainer = ({ children, onClose }: PopupContainerProps) => {
  return (
    <div className={styles.popup}>
      <button
        onClick={onClose}
        data-tooltip="Удалить колонку"
        className={styles.columnButton}
      >
        <img className={styles.buttonIcon} src={Close} alt="Удалить колонку" />
      </button>
      {children}
    </div>
  );
};

export default PopupContainer;
