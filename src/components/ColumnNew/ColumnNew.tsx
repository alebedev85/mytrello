import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ColumnNew as ColumnType } from "../../types";
import TaskNew from "../TaskNew/TaskNew.tsx";
import styles from "./Column.module.scss";

interface Props {
  column: ColumnType;
}

const ColumnNew: React.FC<Props> = ({ column }) => {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div ref={setNodeRef} className={styles.column}>
      <h3>{column.title}</h3>
      <SortableContext items={column.tasks} strategy={verticalListSortingStrategy}>
        {column.tasks.map((task) => (
          <TaskNew key={task.id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
};

export default ColumnNew;