import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { TaskNew as TaskType } from "../../types";
import styles from "./Task.module.scss";

interface Props {
  task: TaskType;
}

const TaskNew: React.FC<Props> = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const style = {
    transform: `translate(${transform?.x}px, ${transform?.y}px)`,
    transition: "transform 200ms ease-in-out",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={styles.task}
    >
      {task.title}
    </div>
  );
};

export default TaskNew;
