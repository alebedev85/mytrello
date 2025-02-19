import React, { useState } from "react";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";
import { Column as ColumnType, Task } from "../../types";
import TaskCard from "../TaskCard/TaskCard";
import { addTask, removeColumn } from "../../store/boardSlice";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import styles from "./Column.module.scss";

interface Props {
  column: ColumnType;
  tasks: Task[];
  index: number;
}

const Column: React.FC<Props> = ({ column, tasks, index }) => {
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

  return (
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
                onClick={() => dispatch(removeColumn(column.id))}
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
                  <TaskCard key={task.id} task={task} index={index} columnId={column.id}/>
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
