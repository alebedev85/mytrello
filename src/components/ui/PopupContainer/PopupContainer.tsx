import { ReactNode } from "react";
import styles from "./PopupContainer.module.scss";

interface PopupContainerProps {
  children: ReactNode;
}

const PopupContainer = ({ children }: PopupContainerProps) => {
  return (
    <div className={styles.popup}>
      {children}
    </div>
  );
};

export default PopupContainer;
