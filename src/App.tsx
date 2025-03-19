import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AddColumnModal from "./components/AddColumnModal/AddColumnModal";
import ConfirmationPopup from "./components/ConfirmationPopup/ConfirmationPopup";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import AccountLayout from "./layouts/AccountLayout";
import AuthLayout from "./layouts/AuthLayout";
import "./firebase";
import { useEffect } from "react";
import Loader from "./components/Loader/Loader";
import { auth } from "./firebase";
import {
  loginStart,
  loginSuccess,
  logout,
} from "./store/authSlice";

import styles from "./App.module.scss";

function App() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.board);
  const { isLoading } = useSelector((state: RootState) => state.auth);

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
          <Route path="/board" element={<AccountLayout />}>
            <Route index element={<Main />} />
          </Route>
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
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
