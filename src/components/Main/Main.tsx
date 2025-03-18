import React from "react";
import Board from "../Board/Board";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";
import { moveTask, moveColumn } from "../../store/boardSlice";

const Main: React.FC = () => {
  const dispatch = useDispatch();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      dispatch(
        moveColumn({
          sourceIndex: source.index,
          destIndex: destination.index,
        })
      );
      return;
    }

    if (type === "task") {
      dispatch(
        moveTask({
          sourceColId: source.droppableId,
          destColId: destination.droppableId,
          sourceIndex: source.index,
          destIndex: destination.index,
          taskId: draggableId,
        })
      );
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Board />
    </DragDropContext>
  );
};

export default Main;
