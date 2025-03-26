import { useSelector } from "react-redux";
import { RootState } from "../../store";
import styles from "./BoardSkeleton.module.scss";

const BoardSkeleton = () => {
  const { theme } = useSelector((state: RootState) => state.board);

  return (
    <div
      className={`${styles.boardSkeleton} ${
        theme === "dark" ? styles.dark : ""
      }`}
    >
      <div className={styles.column}>
        <div className={styles.columnTitle} />
        <div className={styles.card} />
        <div className={styles.card} />
      </div>
      <div className={styles.column}>
        <div className={styles.columnTitle} />
        <div className={styles.card} />
        <div className={styles.card} />
      </div>
      <div className={styles.column}>
        <div className={styles.columnTitle} />
        <div className={styles.card} />
        <div className={styles.card} />
      </div>
    </div>
  );
};

export default BoardSkeleton;
