import { Draggable } from "@hello-pangea/dnd";
import cn from "classnames";
import { useState } from "react";
import { useDispatch } from "react-redux";
import EditIcon from "../../assets/icons/edit-icon.svg";
import CloseIcon from "../../assets/icons/close-icon.svg";
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
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteTask = () => {
    dispatch(
      openConfirmationModal({
        type: "task",
        targetId: { taskId: task.id, columnId },
      }),
    );
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.task}
          style={{
            ...provided.draggableProps.style, // Сначала берем стили из DnD
            backgroundColor:
              task.priority !== "none"
                ? PRIORITY_COLORS[task.priority]
                : undefined, // Добавляем свой цвет
          }}
        >
          {isEditing ? (
            <TaskEditingForm task={task} onClose={() => setIsEditing(false)} />
          ) : (
            <div>
              <div className={styles.header}>
                <div className={styles.controls}>
                  <PriorityMenu
                    taskId={task.id}
                    selectedPriority={task.priority}
                  />
                  <button
                    onClick={() => setIsEditing(true)}
                    className={cn(styles.taskButton, "tooltip")}
                    data-tooltip="Редактировать задачу"
                  >
                    <img
                      className={styles.buttonCEditIcon}
                      src={EditIcon}
                      alt="Редактировать задачу"
                    />
                  </button>
                  <button
                    onClick={handleDeleteTask}
                    className={cn(
                      styles.taskButton,
                      styles.closeButton,
                      "tooltip",
                    )}
                    data-tooltip="Удалить задачу"
                  >
                    <img
                      className={styles.buttonIcon}
                      src={CloseIcon}
                      alt="Удалить задачу"
                    />
                  </button>
                </div>
              </div>
              <div className={styles.body}>
                <h3>{task.title}</h3>
                {task.description && (
                  <p className="text-body">{task.description}</p>
                )}
                {task.createdAt && (
                  <p className="text-body-dull">
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
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
