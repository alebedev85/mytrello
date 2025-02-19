import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./boardSlice";
import { loadState, saveState } from "../utils/storageUtils";

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    board: boardReducer,
  },
  preloadedState: preloadedState ? { board: preloadedState.board } : undefined,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
