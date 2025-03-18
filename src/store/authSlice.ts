import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";
import { RootState } from ".";

// Определяем интерфейс для состояния аутентификации
interface AuthState {
  isAuthenticated: boolean;
  user: User;
}

// Начальное состояние, берем данные из localStorage
const storedUser = localStorage.getItem("user");

// Начальное состояние
const initialState: AuthState = storedUser
  ? { isAuthenticated: true, user: JSON.parse(storedUser) }
  : {
      isAuthenticated: false,
      user: { email: null, token: null, id: null },
    };

// Создаем слайс аутентификации
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Вход пользователя
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    // Выход пользователя
    logout: () => initialState,
  },
});

export const { login, logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
