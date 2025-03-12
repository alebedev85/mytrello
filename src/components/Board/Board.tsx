import { Droppable } from "@hello-pangea/dnd";
import Column from "../Column/Column";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { openAddColumnModal } from "../../store/popupSlice";
import { FaPlus } from "react-icons/fa";

import styles from "./Board.module.scss";

export default function Board() {
  const { columns, columnOrder, tasks, theme } = useSelector(
    (state: RootState) => state.board
  );
  const dispatch = useDispatch();

  const handleOpenAddColumnModal = () => {
    dispatch(openAddColumnModal());
  };

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
            <button
              className={styles.addColumnButton}
              onClick={handleOpenAddColumnModal}
            >
              <FaPlus /> Добавить колонку
            </button>
          </div>
        )}
      </Droppable>
    </div>
  );
}
