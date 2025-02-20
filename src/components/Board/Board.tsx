import React, { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { moveTask, addColumn, toggleTheme } from "../../store/boardSlice";
import Column from "../Column/Column";
import AddColumnModal from "../AddColumnModal/AddColumnModal";
import { FaMoon, FaSun, FaPlus } from "react-icons/fa";
import styles from "./Board.module.scss";

const Board: React.FC = () => {
  const dispatch = useDispatch();
  const { columns, columnOrder, tasks, theme } = useSelector(
    (state: RootState) => state.board
  );
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
        <div className={styles.header}>
          <h1 className={styles.title}>Мои задачи</h1>
          <div className={styles.controls}>
            <button
              onClick={() => setIsModalOpen(true)}
              className={styles.addButton}
            >
              <FaPlus /> Создать колонку
            </button>
            <button
              onClick={() => dispatch(toggleTheme())}
              className={styles.themeButton}
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
          </div>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className={styles.main}>
            <Droppable droppableId="board" type="column" direction="horizontal">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={styles.boardContainer}
                >
                  {columnOrder.map((columnId, index) => {
                    const column = columns[columnId];
                    const columnTasks = column.taskIds.map(
                      (taskId) => tasks[taskId]
                    );

                    return (
                      <Column
                        key={column.id}
                        column={column}
                        tasks={columnTasks}
                        index={index}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
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
