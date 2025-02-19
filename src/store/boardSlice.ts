import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoardState, Task, Column } from "../types";

const initialState: BoardState = {
  tasks: {},
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: [],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
  theme: "light",
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{ columnId: string; task: Task }>
    ) => {
      const { columnId, task } = action.payload;
      state.tasks[task.id] = task;
      state.columns[columnId].taskIds.push(task.id);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const task = action.payload;
      state.tasks[task.id] = task;
    },
    moveTask: (
      state,
      action: PayloadAction<{
        sourceColId: string;
        destColId: string;
        sourceIndex: number;
        destIndex: number;
        taskId: string;
      }>
    ) => {
      const { sourceColId, destColId, sourceIndex, destIndex, taskId } =
        action.payload;
      const sourceCol = state.columns[sourceColId];
      const destCol = state.columns[destColId];

      sourceCol.taskIds.splice(sourceIndex, 1);
      destCol.taskIds.splice(destIndex, 0, taskId);
    },
    removeTask: (
      state,
      action: PayloadAction<{ taskId: string; columnId: string }>
    ) => {
      const { taskId, columnId } = action.payload;

      // Удаляем задачу из объекта tasks
      delete state.tasks[taskId];

      // Удаляем ID задачи из массива taskIds колонки
      const column = state.columns[columnId];
      column.taskIds = column.taskIds.filter((id) => id !== taskId);
    },
    addColumn: (state, action: PayloadAction<Column>) => {
      const column = action.payload;
      state.columns[column.id] = column;
      state.columnOrder.push(column.id);
    },
    removeColumn: (state, action: PayloadAction<string>) => {
      const columnId = action.payload;
      const taskIds = state.columns[columnId].taskIds;

      // Remove tasks in the column
      taskIds.forEach((taskId) => {
        delete state.tasks[taskId];
      });

      // Remove column
      delete state.columns[columnId];
      state.columnOrder = state.columnOrder.filter((id) => id !== columnId);
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const {
  addTask,
  updateTask,
  moveTask,
  removeTask,
  addColumn,
  removeColumn,
  toggleTheme,
} = boardSlice.actions;
export default boardSlice.reducer;
