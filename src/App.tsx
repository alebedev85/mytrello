import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AddColumnModal from "./components/AddColumnModal/AddColumnModal";
import ConfirmationPopup from "./components/ConfirmationPopup/ConfirmationPopup";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import "./firebase";
import { auth } from "./firebase";
import AccountLayout from "./layouts/AccountLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Register from "./pages/Register/Register";
import { RootState } from "./store";
import { loginStart, loginSuccess, logout } from "./store/authSlice";

import styles from "./App.module.scss";

const App = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.board);
  const { isLoading } = useSelector((state: RootState) => state.auth);

  // проверка пользователя при загрузки приложения
  useEffect(() => {
    dispatch(loginStart());
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          loginSuccess({
            email: user.email,
            token: user.refreshToken,
            id: user.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (isLoading) return <Loader />;
  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div
        className={`${styles.container} ${theme === "dark" ? styles.dark : ""}`}
      >
        <Header />
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/board" element={<AccountLayout />}>
            <Route index element={<Main />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <AddColumnModal />
      <ConfirmationPopup />
    </div>
  );
};

export default App;
