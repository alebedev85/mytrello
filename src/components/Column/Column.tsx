import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openConfirmationModal } from "../../store/popupSlice";
import { Column as ColumnType, Task } from "../../types";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import ColumnControls from "../ColumnControls/ColumnControls";
import TaskCard from "../TaskCard/TaskCard";
import styles from "./Column.module.scss";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  index: number;
}

const Column = ({ column, tasks, index }: ColumnProps) => {
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  // Переключение состояния isAdding
  const toggleAddTask = () => {
    setIsAdding((prev) => !prev); // Переключаем состояние
  };

  // Удаление колонки
  const handleDeleteColumn = () => {
    dispatch(
      openConfirmationModal({
        type: "column",
        targetId: { columnId: column.id },
      }),
    );
  };

  // Очистить колонку
  const handleClearColumn = () => {
    dispatch(
      openConfirmationModal({
        type: "clear-tasks",
        targetId: { columnId: column.id },
      }),
    );
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={styles.column}
        >
          <div {...provided.dragHandleProps} className={styles.header}>
            <h2>{column.title}</h2>
            <div className={styles.controls}>
              <ColumnControls
                onAdd={toggleAddTask}
                onClear={handleClearColumn}
                onDelete={handleDeleteColumn}
              />
            </div>
          </div>

          <AddTaskForm
            isActive={isAdding}
            columnId={column.id}
            onClose={() => setIsAdding(false)}
          />

          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`${styles.dropArea} ${
                  snapshot.isDraggingOver ? styles.isDraggingOver : ""
                }`}
              >
                {tasks.map((task, index) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    index={index}
                    columnId={column.id}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
