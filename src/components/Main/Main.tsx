import { Droppable } from "@hello-pangea/dnd";
import styles from "./Main.module.scss";
import Column from "../Column/Column";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function Main() {
  const { columns, columnOrder, tasks, theme } = useSelector(
    (state: RootState) => state.board
  );
  return (
    <div className={`${styles.main} ${theme === "dark" ? styles.dark : ""}`}>
      <Droppable droppableId="board" type="column" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={styles.boardContainer}
          >
            {columnOrder.map((columnId, index) => {
              const column = columns[columnId];
              const columnTasks = column.taskIds.map((taskId) => tasks[taskId]);

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
  );
}
