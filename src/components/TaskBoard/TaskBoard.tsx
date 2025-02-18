import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { RootState } from "../../store";
import { moveTask } from "../../store/taskSlice";
import ColumnNew from "../ColumnNew/ColumnNew";
import styles from "./TaskBoard.module.scss";

const TaskBoard = () => {
  const columns = useSelector((state: RootState) => state.tasks.columns);
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;
    dispatch(moveTask({ taskId: active.id, destinationColumnId: over.id }));
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd}>
      <div className={styles.board}>
        {columns.map((column) => (
          <ColumnNew key={column.id} column={column} />
        ))}
      </div>
    </DndContext>
  );
};

export default TaskBoard;