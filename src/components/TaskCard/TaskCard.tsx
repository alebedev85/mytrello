import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { openConfirmationModal } from "../../store/popupSlice";
import { Task } from "../../types";
import { PRIORITY_COLORS } from "../../utils/constants";
import PriorityMenu from "../PriorityMenu/PriorityMenu";
import TaskEditingForm from "../TaskEditing/TaskEditingForm";

import styles from "./TaskCard.module.scss";

interface TaskCardProps {
  task: Task;
  columnId: string;
  index: number;
}

const TaskCard = ({ task, columnId, index }: TaskCardProps) => {
  const { theme } = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteTask = () => {
    dispatch(
      openConfirmationModal({
        type: "task",
        targetId: { taskId: task.id, columnId },
      })
    );
  };

  return (
    <div className={`${theme === "dark" ? styles.dark : ""}`}>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`${styles.task} ${
              snapshot.isDragging ? styles.isDragging : ""
            }`}
            style={{
              ...provided.draggableProps.style, // Сначала берем стили из DnD
              backgroundColor:
                task.priority !== "none"
                  ? PRIORITY_COLORS[task.priority]
                  : undefined, // Добавляем свой цвет
            }}
          >
            {isEditing ? (
              <TaskEditingForm
                task={task}
                onClose={() => setIsEditing(false)}
              />
            ) : (
              <div>
                <div className={styles.header}>
                  <h3 className={styles.title}>{task.title}</h3>
                  <div className={styles.buttons}>
                    <PriorityMenu
                      taskId={task.id}
                      selectedPriority={task.priority}
                    />
                    <button
                      onClick={() => setIsEditing(true)}
                      className={`${styles.button} tooltip`}
                      data-tooltip="Редактировать задачу"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={handleDeleteTask}
                      className={`${styles.deleteButton} tooltip`}
                      data-tooltip="Удалить задачу"
                    >
                      <IoClose />
                    </button>
                  </div>
                </div>
                {task.createdAt && (
                  <p className={styles.description}>
                    Создано:{" "}
                    {new Date(task.createdAt).toLocaleString("ru-RU", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
                {task.description && (
                  <p className={styles.description}>{task.description}</p>
                )}
              </div>
            )}
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default TaskCard;
