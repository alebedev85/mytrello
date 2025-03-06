import React, { useState } from "react";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import { Column as ColumnType, Task } from "../../types";
import TaskCard from "../TaskCard/TaskCard";
import { addTask } from "../../store/boardSlice";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import styles from "./Column.module.scss";
import { RootState } from "../../store";
import { openConfirmationModal } from "../../store/popupSlice";

interface Props {
  column: ColumnType;
  tasks: Task[];
  index: number;
}

const Column: React.FC<Props> = ({ column, tasks, index }) => {
  const { theme } = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title: newTaskTitle,
        description: "",
      };
      dispatch(addTask({ columnId: column.id, task: newTask }));
      setNewTaskTitle("");
      setIsAdding(false);
    }
  };

  const handleDeleteColumn = () => {
    dispatch(openConfirmationModal({ type: "column", targetId: { taskId: column.id, columnId: column.id } }));
  };

  return (
    <div className={`${theme === "dark" ? styles.dark : ""}`}>
      <Draggable draggableId={column.id} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            className={styles.column}
          >
            <div {...provided.dragHandleProps} className={styles.header}>
              <span>{column.title}</span>
              <div className={styles.controls}>
                <button
                  onClick={() => setIsAdding(true)}
                  className={`${styles.addButton} tooltip`}
                  data-tooltip="Новая задачу"
                >
                  <FaPlus />
                </button>
                <button
                  onClick={handleDeleteColumn}
                  data-tooltip="Удалить колонку"
                  className={`${styles.deleteButton} tooltip`}
                >
                  <IoClose />
                </button>
              </div>
            </div>

            <AddTaskForm
              isActive={isAdding}
              newTaskTitle={newTaskTitle}
              setNewTaskTitle={setNewTaskTitle}
              handleAddTask={handleAddTask}
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
    </div>
  );
};

export default Column;
