import { useEffect } from "react";
import { Droppable } from "@hello-pangea/dnd";
import Column from "../Column/Column";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setState } from "../../store/boardSlice";
import { openAddColumnModal } from "../../store/popupSlice";
import { FaPlus } from "react-icons/fa";
import { loadBoardState } from "../../utils/storageFirebase"; // Хелпер для загрузки
import { useAuth } from "../../hooks/useAuth"; // Хук для получения пользователя
import useSaveBoardState from "../../hooks/useSaveBoardState"; // Хук для сохранения в Firebase

import styles from "./Board.module.scss";

export default function Board() {
  const { columns, columnOrder, tasks, theme } = useSelector(
    (state: RootState) => state.board
  );
  const board = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();
  const { user } = useAuth();

  // Загрузка состояния доски при монтировании компонента
  useEffect(() => {
    const loadBoard = async () => {
      if (!user?.uid) return;

      try {
        const boardState = await loadBoardState(user.uid);

        if (boardState && JSON.stringify(boardState) !== JSON.stringify(board)) {
          dispatch(setState(boardState));
        }
      } catch (error) {
        console.error("Ошибка загрузки состояния доски:", error);
      }
    };

    loadBoard();
  }, [user, dispatch]); // Загружаем только если пользователь существует

  // Хук для сохранения состояния доски при изменении
  useSaveBoardState(user?.uid);

  return (
    <div className={`${styles.board} ${theme === "dark" ? styles.dark : ""}`}>
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
              onClick={() => {
                dispatch(openAddColumnModal());
              }}
            >
              <FaPlus /> Добавить колонку
            </button>
          </div>
        )}
      </Droppable>
    </div>
  );
}

