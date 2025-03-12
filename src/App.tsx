import { Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "./store/boardSlice";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import PrivateRoute from "./pages/PrivateRoute/PrivateRoute";
import { RootState } from "./store";
import AddColumnModal from "./components/AddColumnModal/AddColumnModal";
import ConfirmationPopup from "./components/ConfirmationPopup/ConfirmationPopup";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

import styles from "./App.module.scss";

function App() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.board);
  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div
        className={`${styles.container} ${theme === "dark" ? styles.dark : ""}`}
      >
        <Header toggleTheme={() => dispatch(toggleTheme())} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="" element={<Main />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <AddColumnModal />
      <ConfirmationPopup />
    </div>
  );
}

export default App;
