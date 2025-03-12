import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";
import { RootState } from ".";

// Определяем интерфейс для состояния аутентификации
interface AuthState {
  isAuthenticated: boolean;
  user: User;
}

// Начальное состояние
const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    email: null,
    token: null,
    id: null,
  },
};

// Создаем слайс аутентификации
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Действие для входа
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    // Действие для выхода
    logout: () => {
      return initialState;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
