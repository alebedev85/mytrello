import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
  return (
    <div className={styles.content}>
      <h1>404 - Страница не найдена</h1>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
};

export default NotFoundPage;
