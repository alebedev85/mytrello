import React, { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { moveTask, addColumn, toggleTheme, moveColumn } from "../../store/boardSlice";
import AddColumnModal from "../AddColumnModal/AddColumnModal";
import styles from "./Board.module.scss";

const Board: React.FC = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.board);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleAddColumn = () => {
    if (newColumnTitle.trim()) {
      const newColumn = {
        id: `column-${Date.now()}`,
        title: newColumnTitle,
        taskIds: [],
      };
      dispatch(addColumn(newColumn));
      setNewColumnTitle("");
      setIsModalOpen(false);
    }
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div
        className={`${styles.container} ${theme === "dark" ? styles.dark : ""}`}
      >
        <Header
          toggleTheme={() => dispatch(toggleTheme())}
        />

        <DragDropContext onDragEnd={onDragEnd}>
          <Main addColumnButton={() => setIsModalOpen(true)} />
        </DragDropContext>
        <AddColumnModal
          isOpen={isModalOpen}
          newColumnTitle={newColumnTitle}
          setNewColumnTitle={setNewColumnTitle}
          handleAddColumn={handleAddColumn}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Board;
