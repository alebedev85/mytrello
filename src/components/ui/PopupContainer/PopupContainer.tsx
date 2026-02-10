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
      <div className={styles.header}>
        <button
          onClick={onClose}
          data-tooltip="Удалить колонку"
          className={styles.closeButton}
        >
          <img
            className={styles.buttonIcon}
            src={Close}
            alt="Удалить колонку"
          />
        </button>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default PopupContainer;
