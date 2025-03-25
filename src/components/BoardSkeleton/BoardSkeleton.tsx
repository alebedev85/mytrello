import styles from "./BoardSkeleton.module.scss";

const BoardSkeleton = () => {
  return (
    <div className={styles.boardSkeleton}>
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
