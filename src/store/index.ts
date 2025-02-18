import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './boardSlice';
import taskReducer from "./taskSlice";

export const store = configureStore({
  reducer: {
    board: boardReducer,
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;