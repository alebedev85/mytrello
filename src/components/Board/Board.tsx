import React, { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { moveTask, addColumn, toggleTheme } from "../../store/boardSlice";
import Column from "../Column/Column";
import { FaMoon, FaSun, FaPlus } from "react-icons/fa";
import styles from "./Board.module.scss";

const Board: React.FC = () => {
  const dispatch = useDispatch();
  const { columns, columnOrder, tasks, theme } = useSelector(
    (state: RootState) => state.board
  );
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [isAddingColumn, setIsAddingColumn] = useState(false);

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
      setIsAddingColumn(false);
    }
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div
        className={`${styles.container} ${theme === "dark" ? styles.dark : ""}`}
      >
        <div className={styles.header}>
          <h1 className={styles.title}>Mini Trello</h1>
          <div className={styles.controls}>
            <button
              onClick={() => setIsAddingColumn(true)}
              className={styles.addButton}
            >
              <FaPlus /> Add Column
            </button>
            <button
              onClick={() => dispatch(toggleTheme())}
              className={styles.themeButton}
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
          </div>
        </div>

        {isAddingColumn && (
          <div className={styles.columnForm}>
            <input
              type="text"
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              placeholder="Column title"
              className={styles.input}
              onKeyPress={(e) => e.key === "Enter" && handleAddColumn()}
            />
            <button
              onClick={() => setIsAddingColumn(false)}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button onClick={handleAddColumn} className={styles.addButton}>
              Add
            </button>
          </div>
        )}

        <DragDropContext onDragEnd={onDragEnd}>
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
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;
