import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskNew, ColumnNew } from "../types";

interface BoardState {
  columns: ColumnNew[];
}

const initialState: BoardState = {
  columns: [
    { id: "todo", title: "To Do", tasks: [
      { id: "1", title: "Сделать дизайн" },
      { id: "2", title: "Написать код" }
    ] },
    { id: "inProgress", title: "In Progress", tasks: [] },
    { id: "done", title: "Done", tasks: [] }
  ],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    moveTask: (state, action: PayloadAction<{ taskId: string; destinationColumnId: string }>) => {
      const { taskId, destinationColumnId } = action.payload;
      
      let movedTask: TaskNew | null = null;
      
      state.columns.forEach((column) => {
        const index = column.tasks.findIndex((task) => task.id === taskId);
        if (index !== -1) {
          [movedTask] = column.tasks.splice(index, 1);
        }
      });
      
      if (movedTask) {
        const destinationColumn = state.columns.find(col => col.id === destinationColumnId);
        destinationColumn?.tasks.push(movedTask);
      }
    },
  },
});

export const { moveTask } = taskSlice.actions;
export default taskSlice.reducer;