import { Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import { useSelector } from "react-redux";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import PrivateRoute from "./pages/PrivateRoute/PrivateRoute";
import { RootState } from "./store";
import AddColumnModal from "./components/AddColumnModal/AddColumnModal";
import ConfirmationPopup from "./components/ConfirmationPopup/ConfirmationPopup";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import "./firebase";

import styles from "./App.module.scss";
import { Suspense } from "react";
import Loader from "./components/Loader/Loader";
import AuthProvider from "./layouts/AuthProvider";


function App() {
  const { theme } = useSelector((state: RootState) => state.board);
  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div
        className={`${styles.container} ${theme === "dark" ? styles.dark : ""}`}
      >
        <Header />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<AuthProvider />}>
              <Route path="/board" element={<PrivateRoute />}>
                <Route index element={<Main />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
      <AddColumnModal />
      <ConfirmationPopup />
    </div>
  );
}

export default App;
