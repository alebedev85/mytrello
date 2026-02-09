import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoardState, Task, Column, Priority } from "../types";

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
    // Установка состояния
    setState: (_state, action: PayloadAction<BoardState>) => {
      return action.payload;
    },

    // Добавление новой задачи в указанную колонку
    addTask: (
      state,
      action: PayloadAction<{ columnId: string; task: Task }>
    ) => {
      const { columnId, task } = action.payload;
      state.tasks[task.id] = { ...task, createdAt: new Date().toISOString() }; // Добавление задачи в список
      state.columns[columnId].taskIds.unshift(task.id); // Добавление id задачи в колонку
    },

    // Обновление задачи
    updateTask: (state, action: PayloadAction<Task>) => {
      const task = action.payload;
      state.tasks[task.id] = task; // Перезапись задачи
    },
    changeTaskPriority(
      state,
      action: PayloadAction<{ taskId: string; priority: Priority }>
    ) {
      const { taskId, priority } = action.payload;
      if (state.tasks[taskId]) {
        state.tasks[taskId].priority = priority;
      }
    },
    // Перемещение задачи между колонками или внутри одной колонки
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

      sourceCol.taskIds.splice(sourceIndex, 1); // Удаление id задачи из исходной колонки
      destCol.taskIds.splice(destIndex, 0, taskId); // Вставка id задачи в новую позицию
    },

    // Удаление задачи
    removeTask: (
      state,
      action: PayloadAction<{ taskId: string; columnId: string }>
    ) => {
      const { taskId, columnId } = action.payload;

      delete state.tasks[taskId]; // Удаление задачи из списка задач
      state.columns[columnId].taskIds = state.columns[columnId].taskIds.filter(
        (id) => id !== taskId
      ); // Удаление id задачи из списка колонки
    },

    // Добавление новой колонки
    addColumn: (state, action: PayloadAction<Column>) => {
      const column = action.payload;
      state.columns[column.id] = column; // Добавление колонки в список
      state.columnOrder.push(column.id); // Добавление id колонки в порядок отображения
    },

    // Перемещение колонки в новый порядок
    moveColumn: (
      state,
      action: PayloadAction<{ sourceIndex: number; destIndex: number }>
    ) => {
      const { sourceIndex, destIndex } = action.payload;
      const [movedColumn] = state.columnOrder.splice(sourceIndex, 1); // Удаление колонки из текущей позиции
      state.columnOrder.splice(destIndex, 0, movedColumn); // Вставка колонки в новую позицию
    },

    // Удаление колонки и всех её задач
    removeColumn: (state, action: PayloadAction<string>) => {
      const columnId = action.payload;
      const taskIds = state.columns[columnId].taskIds;

      taskIds.forEach((taskId) => {
        delete state.tasks[taskId]; // Удаление всех задач, связанных с колонкой
      });

      delete state.columns[columnId]; // Удаление колонки
      state.columnOrder = state.columnOrder.filter((id) => id !== columnId); // Удаление id колонки из порядка отображения
    },

    // Изменение цвета колонки
    changeColumnColor(
      state,
      action: PayloadAction<{ columnId: string; color: string }>
    ) {
      const { columnId, color } = action.payload;
      if (state.columns[columnId]) {
        state.columns[columnId].color = color;
      }
    },

    // Очистка колонки
    clearTasksInColumn: (state, action: PayloadAction<string>) => {
      const columnId = action.payload;
      state.columns[columnId].taskIds.forEach((taskId) => {
        delete state.tasks[taskId];
      });
      state.columns[columnId].taskIds = [];
    },

    // Переключение темы (светлая/тёмная)
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const {
  setState,
  addTask,
  updateTask,
  changeTaskPriority,
  moveTask,
  removeTask,
  addColumn,
  moveColumn,
  removeColumn,
  changeColumnColor,
  clearTasksInColumn,
  toggleTheme,
} = boardSlice.actions;

export default boardSlice.reducer;
