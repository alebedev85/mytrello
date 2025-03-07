import React from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { moveTask, toggleTheme, moveColumn } from "../../store/boardSlice";
import AddColumnModal from "../AddColumnModal/AddColumnModal";
import styles from "./Board.module.scss";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";

const Board: React.FC = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.board);

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
    <div className={theme === "dark" ? "dark" : ""}>
      <div
        className={`${styles.container} ${theme === "dark" ? styles.dark : ""}`}
      >
        <Header toggleTheme={() => dispatch(toggleTheme())} />
        <DragDropContext onDragEnd={onDragEnd}>
          <Main />
        </DragDropContext>
        <AddColumnModal />
        <ConfirmationPopup />
      </div>
    </div>
  );
};

export default Board;
